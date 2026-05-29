// Flat list of books. Each book belongs to a `shelf`; the Bookshelf
// component groups by shelf (in first-seen order) and wraps a shelf
// onto extra rows when it has more books than fit across.
export const books = [
  {
    title: "Normal People",
    author: "Sally Rooney",
    shelf: "favourites",
    cover: "https://covers.openlibrary.org/b/isbn/9781984822178-L.jpg",
  },
  {
    title: "Dash and Lily's Book of Dares",
    author: "Rachel Cohn and David Levithan",
    shelf: "favourites",
    cover: "https://covers.openlibrary.org/b/isbn/9781760878283-L.jpg",
  },
  {
    title: "Holding Up the Universe",
    author: "Jennifer Niven",
    shelf: "favourites",
    cover: "https://covers.openlibrary.org/b/isbn/9780141357058-L.jpg",
  },
  {
    title: "Legend",
    author: "Marie Lu",
    shelf: "favourites",
    cover: "https://covers.openlibrary.org/b/isbn/9780399256752-L.jpg",
  },
  {
    title: "Talking at Night",
    author: "Claire Daverley",
    shelf: "current",
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1681244420l/62583508.jpg",
  },
  {
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    shelf: "current",
    cover: "https://m.media-amazon.com/images/I/81WY6M9XikL.jpg",
  },
  {
    title: "Crazy Rich Asians",
    author: "Kevin Kwan",
    shelf: "current",
    cover: "https://covers.openlibrary.org/b/isbn/9780385536974-L.jpg",
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    shelf: "current",
    cover: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg",
  },
  {
    title: "Permanent Record",
    author: "Mary H. K. Choi",
    shelf: "current",
    cover: "https://covers.openlibrary.org/b/isbn/9781534445987-L.jpg",
  },
  {
    title: "The Dictionary of Obscure Sorrows",
    author: "John Koenig",
    shelf: "current",
    cover: "https://covers.openlibrary.org/b/isbn/9781501153648-L.jpg",
  },
  {
    title: "An Absolutely Remarkable Thing",
    author: "Hank Green",
    shelf: "current",
    cover: "https://covers.openlibrary.org/b/isbn/9781524743444-L.jpg",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    shelf: "current",
    cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
  },

  {
    title: "The Perks of Being a Wallflower",
    author: "Stephen Chbosky",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/71720uZoL4L._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Turtles All the Way Down",
    author: "John Green",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780525555360-L.jpg",
  },
  {
    title: "We Were Liars",
    author: "E. Lockhart",
    shelf: "YA",
    cover: "https://images.randomhouse.com/cover/9780385741279",
  },
  {
    title: "I'll Give You the Sun",
    author: "Jandy Nelson",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780803734968-L.jpg",
  },
  {
    title: "It's Kind of a Funny Story",
    author: "Ned Vizzini",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780786851973-L.jpg",
  },

  {
    title: "Eleanor & Park",
    author: "Rainbow Rowell",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781250053992-L.jpg",
  },

  {
    title: "All the Bright Places",
    author: "Jennifer Niven",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/91JTGZzlzbL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780142424179-L.jpg",
  },
  {
    title: "Looking for Alaska",
    author: "John Green",
    shelf: "YA",
    cover: "https://upload.wikimedia.org/wikipedia/en/3/3e/Looking_for_Alaska_original_cover.jpg",
  },
  {
    title: "Paper Towns",
    author: "John Green",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780142414934-L.jpg",
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/61I24wOsn8L.jpg",
  },
  {
    title: "Catching Fire",
    author: "Suzanne Collins",
    shelf: "YA",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a2/Catching_Fire_%28Suzanne_Collins_novel_-_cover_art%29.jpg",
  },
  {
    title: "Mockingjay",
    author: "Suzanne Collins",
    shelf: "YA",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Mockingjay.JPG/250px-Mockingjay.JPG",
  },

  {
    title: "Champion",
    author: "Marie Lu",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/91sakgZ6fuL.jpg",
  },

  {
    title: "Prodigy",
    author: "Marie Lu",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780399256776-L.jpg",
  },
  {
    title: "Every Day",
    author: "David Levithan",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780307931894-L.jpg",
  },
  {
    title: "Another Day",
    author: "David Levithan",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/81cnJKJapgL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Someday",
    author: "David Levithan",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/91jGvbxGrDL.jpg",
  },

  {
    title: "They Both Die at the End",
    author: "Adam Silvera",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062457790-L.jpg",
  },
  {
    title: "Divergent",
    author: "Veronica Roth",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062024022-L.jpg",
  },
  {
    title: "Insurgent",
    author: "Veronica Roth",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062024046-L.jpg",
  },
  {
    title: "Allegiant",
    author: "Veronica Roth",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062024060-L.jpg",
  },
  {
    title: "We Are Okay",
    author: "Nina LaCour",
    shelf: "YA",
    note: "Did I actually read this??",
    cover: "https://covers.openlibrary.org/b/isbn/9780525425892-L.jpg",
  },
  {
    title: "The Inexplicable Logic of My Life",
    author: "Benjamin Alire Sáenz",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/91oDZ5HyJsL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "If I Stay",
    author: "Gayle Forman",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781101046340-L.jpg",
  },

  {
    title: "Thirteen Reasons Why",
    author: "Jay Asher",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781595141712-L.jpg",
  },
  {
    title: "The Sun Is Also a Star",
    author: "Nicola Yoon",
    shelf: "YA",
    cover: "https://upload.wikimedia.org/wikipedia/en/2/28/The_Sun_Is_Also_a_Star.jpg",
  },
  {
    title: "Everything, Everything",
    author: "Nicola Yoon",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780553496642-L.jpg",
  },
  {
    title: "The Rest of Us Just Live Here",
    author: "Patrick Ness",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/61I-TI+IFoL._AC_UF1000,1000_QL80_.jpg",
  }, {
    title: "Since You've Been Gone",
    author: "Morgan Matson",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781442435001-L.jpg",
  },
  {
    title: "The Twelve Days of Dash & Lily",
    author: "Rachel Cohn and David Levithan",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/81VJXVhM+OL.jpg",
  },
  {
    title: "Love & Gelato",
    author: "Jenna Evans Welch",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781481432559-L.jpg",
  },
  {
    title: "Love & Luck",
    author: "Jenna Evans Welch",
    shelf: "YA",
    cover: "https://m.media-amazon.com/images/I/81uhDKHfqwL.jpg",
  },
  {
    title: "Love and Other Train Wrecks",
    author: "Leah Konen",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062402509-L.jpg",
  },

  {
    title: "An Abundance of Katherines",
    author: "John Green",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780142410707-L.jpg",
  },
  {
    title: "Let It Snow",
    author: "John Green, Maureen Johnson, Lauren Myracle",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780142412145-L.jpg",
  },
  {
    title: "Will Grayson, Will Grayson",
    author: "John Green & David Levithan",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780142418475-L.jpg",
  },
  {
    title: "Emergency Contact",
    author: "Mary H.K. Choi",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781534408968-L.jpg",
  },

  {
    title: "A Study in Charlotte",
    author: "Brittany Cavallaro",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062398918-L.jpg",
  },
  {
    title: "The Last of August",
    author: "Brittany Cavallaro",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062398956-L.jpg",
  },
  {
    title: "The Case for Jamie",
    author: "Brittany Cavallaro",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780062398987-L.jpg",
  },
  {
    title: "Cinder",
    author: "Marissa Meyer",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780312641894-L.jpg",
  },
  {
    title: "Scarlet",
    author: "Marissa Meyer",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781250007216-L.jpg",
  },
  {
    title: "Cress",
    author: "Marissa Meyer",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780312642976-L.jpg",
  },
  {
    title: "Winter",
    author: "Marissa Meyer",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781250074218-L.jpg",
  },
  {
    title: "To All the Boys I've Loved Before",
    author: "Jenny Han",
    shelf: "YA",
    cover: "https://upload.wikimedia.org/wikipedia/en/0/0f/To_All_the_Boys_I%27ve_Loved_Before_cover.jpg",
  },
  {
    title: "Five Feet Apart",
    author: "Rachael Lippincott, Mikki Daughtry & Tobias Iaconis",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781534437333-L.jpg",
    note: "Did I read this??"
  },
  {
    title: "The Maze Runner",
    author: "James Dashner",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780385737951-L.jpg",
  },
  {
    title: "The Scorch Trials",
    author: "James Dashner",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780385738767-L.jpg",
  },
  {
    title: "That Time I Joined the Circus",
    author: "J.J. Howard",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780545433815-L.jpg",
  },
  {
    title: "Flipped",
    author: "Wendelin Van Draanen",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780375811746-L.jpg",
  },
  {
    title: "Meet Cute: Some People Are Destined to Meet",
    author: "Jennifer L. Armentrout, Nicola Yoon, et al.",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781328759870-L.jpg",
  },
  {
    title: "My True Love Gave to Me: Twelve Winter Romances",
    author: "Stephanie Perkins, Holly Black, et al.",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9781250059307-L.jpg",
  },
  {
    title: "Let's Get Lost",
    author: "Adi Alsaid",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780373211241-L.jpg",
  },
  {
    title: "Kids of Appetite",
    author: "David Arnold",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780451470782-L.jpg",
  },

{
    title: "Tell Me Three Things",
    author: "Julie Buxbaum",
    shelf: "YA",
  note: "Did I read this??",

    cover: "https://covers.openlibrary.org/b/isbn/9780553535648-L.jpg",
  },
  {
    title: "Life of Pi",
    author: "Yann Martel",
    shelf: "YA",
    cover: "https://covers.openlibrary.org/b/isbn/9780156030205-L.jpg",
  },

{
  title: "The 5th Wave",
  author: "Rick Yancey",
  shelf: "YA",
  cover: "https://covers.openlibrary.org/b/isbn/9780399162411-L.jpg",
},
{
  title: "Mosquitoland",
  author: "David Arnold",
  shelf: "YA",
  cover: "https://m.media-amazon.com/images/I/91+F8qCiXuL.jpg",
},
{
  title: "Seven Ways We Lie",
  author: "Riley Redgate",
  shelf: "YA",
  cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1446761258i/26240663.jpg",
},
{
    "title": "Nick & Norah's Infinite Playlist",
    "author": "Rachel Cohn & David Levithan",
    "shelf": "YA",
    "cover": "https://m.media-amazon.com/images/I/81c0ibGey1L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "title": "Naomi and Ely's No Kiss List",
    "author": "Rachel Cohn & David Levithan",
    "shelf": "YA",
    "cover": "https://covers.openlibrary.org/b/isbn/9780375844409-L.jpg"
  },
  {
    "title": "Sam & Ilsa's Last Hurrah",
    "author": "Rachel Cohn & David Levithan",
    "shelf": "YA",
    "cover": "https://m.media-amazon.com/images/I/81+wIo8GaUL._AC_UF1000,1000_QL80_.jpg"
  },
{
    "title": "My Heart and Other Black Holes",
    "author": "Jasmine Warga",
    "shelf": "YA",
    "cover": "https://covers.openlibrary.org/b/isbn/9780062324672-L.jpg"
  },
  {
    "title": "What Light",
    "author": "Jay Asher",
    "shelf": "YA",
    "cover": "https://covers.openlibrary.org/b/isbn/9781595145512-L.jpg"
  },
{
    "title": "P.S. I Like You",
    "author": "Kasie West",
    "shelf": "YA",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545850971-L.jpg"
  },
{
    "title": "Love, Life, and the List",
    "author": "Kasie West",
    "shelf": "YA",
    "cover": "https://covers.openlibrary.org/b/isbn/9780062675781-L.jpg"
  },
{
    "title": "The Lightning Thief",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423121701-L.jpg"
  },
  {
    "title": "The Sea of Monsters",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780786856862-L.jpg"
  },
  {
    "title": "The Titan's Curse",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423101451-L.jpg"
  },
  {
    "title": "The Battle of the Labyrinth",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423101468-L.jpg"
  },
  {
    "title": "The Last Olympian",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423101475-L.jpg"
  },
  {
    "title": "The Lost Hero",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423113393-L.jpg"
  },
  {
    "title": "The Son of Neptune",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423140597-L.jpg"
  },
  {
    "title": "The Mark of Athena",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423140603-L.jpg"
  },
  {
    "title": "The House of Hades",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423146728-L.jpg"
  },
{
    "title": "The Blood of Olympus",
    "author": "Rick Riordan",
    "shelf": "children",
    "cover": "https://upload.wikimedia.org/wikipedia/en/4/47/BloodOfOlympus.jpg"
  },
{
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg"
  },
  {
    "title": "Harry Potter and the Chamber of Secrets",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg"
  },
  {
    "title": "Harry Potter and the Prisoner of Azkaban",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439136358-L.jpg"
  },
  {
    "title": "Harry Potter and the Goblet of Fire",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439139595-L.jpg"
  },
  {
    "title": "Harry Potter and the Order of the Phoenix",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439358064-L.jpg"
  },
  {
    "title": "Harry Potter and the Half-Blood Prince",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439784542-L.jpg"
  },
{
    "title": "Harry Potter and the Deathly Hallows",
    "author": "J.K. Rowling",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545139700-L.jpg"
  },
{
    "title": "Matilda",
    "author": "Roald Dahl",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780141341248-L.jpg"
  },
  {
    "title": "The Witches",
    "author": "Roald Dahl",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780142410110-L.jpg"
  },
{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780261103344-L.jpg"
  },
{
    "title": "Holes",
    "author": "Louis Sachar",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780440414803-L.jpg"
  },
  {
    "title": "Sideways Stories from Wayside School",
    "author": "Louis Sachar",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780380731480-L.jpg"
  },
{
    "title": "Frindle",
    "author": "Andrew Clements",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780689818769-L.jpg"
  },
{
    "title": "Welcome to Dead House",
    "author": "R.L. Stine",
    "shelf": "children",
    "note": "Probably read around 10 in the series",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545086042-L.jpg"
  },
{
    "title": "Big Nate: In a Class by Himself",
    "author": "Lincoln Peirce",
    "shelf": "children",
    "note": "Probably read around 3 in the series",
    "cover": "https://covers.openlibrary.org/b/isbn/9780061944345-L.jpg"
  },
{
    "title": "The Absent Author",
    "author": "Ron Roy",
    "shelf": "children",
    "note": "Probably read around 15 in the series",
    "cover": "https://covers.openlibrary.org/b/isbn/9780679881681-L.jpg"
  },
{
    "title": "Dinosaurs Before Dark",
    "author": "Mary Pope Osborne",
    "note": "Probably read around 30 in the series",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780679824114-L.jpg"
  },
{
    "title": "Diary of a Wimpy Kid",
    "author": "Jeff Kinney",
    "shelf": "children",
    "note": "Probably read around 6-8 in the series?",
    "cover": "https://covers.openlibrary.org/b/isbn/9780810993136-L.jpg"
  },
{
    "title": "Powerless",
    "author": "Matthew Cody",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780375855955-L.jpg"
  },
  {
    "title": "D'Aulaires' Book of Greek Myths",
    "author": "Ingri d'Aulaire",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780440406945-L.jpg"
  },
{
    "title": "Hatchet",
    "author": "Gary Paulsen",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781416936473-L.jpg"
  },
{
    "title": "Brian's Winter",
    "author": "Gary Paulsen",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780385321983-L.jpg"
  },
{
    "title": "Artemis Fowl",
    "author": "Eoin Colfer",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781368036986-L.jpg"
  },
{
    "title": "Tentacles",
    "author": "Roland Smith",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545166881-L.jpg"
  },
{
    "title": "Dark Life",
    "author": "Kat Falls",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545178150-L.jpg"
  },
  {
    "title": "Lost Treasure of the Emerald Eye",
    "author": "Geronimo Stilton",
    "shelf": "children",
    "note": "Probably read around 20 in the series",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439559638-L.jpg"
  },
  {
    "title": "The Arctic Incident",
    "author": "Eoin Colfer",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781423124542-L.jpg"
  },
  {
    "title": "The Unwanteds",
    "author": "Lisa McMann",
    "shelf": "children",
    "cover": "https://covers.openlibrary.org/b/isbn/9781442407688-L.jpg"
  },
{
    "title": "The Adventures of Captain Underpants",
    "author": "Dav Pilkey",
    "note": "Probably read around 4-5 in the series",
    "shelf": "children",
    "cover": "https://m.media-amazon.com/images/I/71rq5Gn8jfL._AC_UF1000,1000_QL80_.jpg"
  },
{
    "title": "Amulet #1: The Stonekeeper",
    "author": "Kazu Kibuishi",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439846813-L.jpg",
    "shelf": "children",
  },
  {
    "title": "Amulet #2: The Stonekeeper's Curse",
    "author": "Kazu Kibuishi",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439846837-L.jpg",
    "shelf": "children",
  },
  // {
  //   "title": "Amulet #3: The Cloud Searchers",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780439846851-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "Amulet #4: The Last Council",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780439846875-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "Amulet #5: Prince of the Elves",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780439846899-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "Amulet #6: Escape From Lucien",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780545433167-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "Amulet #7: Firelight",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780545433174-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "Amulet #8: Supernova",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780545433181-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "Amulet #9: Waverider",
  //   "author": "Kazu Kibuishi",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780545433198-L.jpg",
  //   "shelf": "children",
  // },
  {
    "title": "Cardboard",
    "author": "Doug TenNapel",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545418720-L.jpg",
    "shelf": "children",
  },
  // {
  //   "title": "Knights of the Lunch Table: The Dodgeball Chronicles",
  //   "author": "Frank Cammuso",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780439928137-L.jpg",
  //   "shelf": "children",
  // },
  // {
  //   "title": "The Silver Six",
  //   "author": "A.J. Lieberman",
  //   "cover": "https://covers.openlibrary.org/b/isbn/9780545292436-L.jpg",
  //   "shelf": "children",
  // },
{
    "title": "Twelfth Night",
    "author": "William Shakespeare",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780743482776-L.jpg"
  },
  {
    "title": "Hamlet",
    "author": "William Shakespeare",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780743477123-L.jpg"
  },
  {
    "title": "The Merchant of Venice",
    "author": "William Shakespeare",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780743477567-L.jpg"
  },
  {
    "title": "Macbeth",
    "author": "William Shakespeare",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780743477109-L.jpg"
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg"
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg"
  },
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "shelf": "classic",
    "cover": "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg"
  }


];


// Missing novels:
// Grey novel protagonist named wren
// TFIOS like book, boy is amputee????
// Hockey protagonist gives up A to play with captain
