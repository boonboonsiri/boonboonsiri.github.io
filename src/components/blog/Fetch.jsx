"use client";

import { useEffect, useState } from "react";

const CLIENT_ID =
  "bbdc6ef3762643df86715feaf5d6c35b";

const REDIRECT_URI =
  "http://127.0.0.1:5173/posts/spotify";

const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");

const VERIFIER_KEY =
  "spotify_pkce_verifier";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const values = new Uint8Array(length);

  crypto.getRandomValues(values);

  return Array.from(values)
    .map(
      (value) =>
        characters[value % characters.length]
    )
    .join("");
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(
    verifier
  );

  const digest =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return btoa(
    String.fromCharCode(
      ...new Uint8Array(digest)
    )
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function Spotify() {
  const [status, setStatus] =
    useState("Ready");

  const [refreshToken, setRefreshToken] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const code = params.get("code");
    const spotifyError =
      params.get("error");

    if (spotifyError) {
      setStatus("Authorization failed");
      setError(spotifyError);
      return;
    }

    if (!code) {
      return;
    }

    exchangeCode(code);
  }, []);

  async function exchangeCode(code) {
    try {
      setStatus(
        "Exchanging authorization code..."
      );

      const verifier =
        localStorage.getItem(
          VERIFIER_KEY
        );

      if (!verifier) {
        throw new Error(
          "PKCE verifier was not found. Click Connect Spotify and authorize again."
        );
      }

      const body = new URLSearchParams();

      body.append(
        "client_id",
        CLIENT_ID
      );

      body.append(
        "grant_type",
        "authorization_code"
      );

      body.append(
        "code",
        code
      );

      body.append(
        "redirect_uri",
        REDIRECT_URI
      );

      body.append(
        "code_verifier",
        verifier
      );

      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: body.toString(),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error_description ||
            data.error ||
            "Spotify token exchange failed"
        );
      }

      if (!data.refresh_token) {
        throw new Error(
          "Spotify did not return a refresh token."
        );
      }

      setRefreshToken(
        data.refresh_token
      );

      setStatus(
        "Success! Your refresh token is below."
      );

      localStorage.removeItem(
        VERIFIER_KEY
      );

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    } catch (err) {
      console.error(
        "Spotify authorization error:",
        err
      );

      setStatus("Failed");

      setError(
        err instanceof Error
          ? err.message
          : "Unknown error"
      );
    }
  }

  async function connectSpotify() {
    try {
      setStatus(
        "Preparing Spotify authorization..."
      );

      setError("");
      setRefreshToken("");

      // Generate PKCE verifier
      const verifier =
        generateRandomString(128);

      // Store it before leaving the page
      localStorage.setItem(
        VERIFIER_KEY,
        verifier
      );

      // Generate challenge from verifier
      const challenge =
        await generateCodeChallenge(
          verifier
        );

      const params =
        new URLSearchParams({
          client_id: CLIENT_ID,

          response_type: "code",

          redirect_uri: REDIRECT_URI,

          scope: SCOPES,

          code_challenge_method: "S256",

          code_challenge: challenge,
        });

      window.location.href =
        `https://accounts.spotify.com/authorize?${params.toString()}`;
    } catch (err) {
      console.error(err);

      setStatus("Failed");

      setError(
        err instanceof Error
          ? err.message
          : "Failed to start Spotify authorization"
      );
    }
  }

  async function copyToken() {
    try {
      await navigator.clipboard.writeText(
        refreshToken
      );

      setStatus(
        "Refresh token copied to clipboard."
      );
    } catch {
      setStatus(
        "Copy failed. Select the token manually."
      );
    }
  }

  function startOver() {
    localStorage.removeItem(
      VERIFIER_KEY
    );

    setRefreshToken("");
    setError("");
    setStatus("Ready");

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>Spotify Authorization</h1>

        <p>{status}</p>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#fee",
              border: "1px solid #fbb",
              borderRadius: "8px",
              color: "#900",
            }}
          >
            {error}
          </div>
        )}

        {!refreshToken &&
          !new URLSearchParams(
            window.location.search
          ).get("code") && (
            <button
              onClick={connectSpotify}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Connect Spotify
            </button>
          )}

        {refreshToken && (
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <h2>Refresh Token</h2>

            <p>
              Copy this and put it into your
              Vercel environment variables.
            </p>

            <textarea
              readOnly
              value={refreshToken}
              onFocus={(event) =>
                event.target.select()
              }
              style={{
                width: "100%",
                minHeight: "160px",
                padding: "15px",
                boxSizing: "border-box",
                fontFamily: "monospace",
                fontSize: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              <button
                onClick={copyToken}
                style={{
                  padding:
                    "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Copy Refresh Token
              </button>

              <button
                onClick={startOver}
                style={{
                  padding:
                    "10px 16px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
