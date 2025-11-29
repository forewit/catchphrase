export const categories = {
  movies: {
    name: 'Movies',
    words: [
      'Jurassic Park', 'The Matrix', 'Titanic', 'Star Wars', 'Harry Potter',
      'The Lion King', 'Finding Nemo', 'Toy Story', 'Forrest Gump', 'The Godfather',
      'Inception', 'Avatar', 'Frozen', 'The Avengers', 'Back to the Future',
      'Ghostbusters', 'E.T.', 'Jaws', 'Rocky', 'The Wizard of Oz',
      'Shrek', 'Pirates of the Caribbean', 'Indiana Jones', 'Mission Impossible', 'James Bond',
      'The Terminator', 'Die Hard', 'Home Alone', 'Grease', 'The Breakfast Club',
      'Pulp Fiction', 'Fight Club', 'The Shining', 'Gladiator', 'Braveheart',
      'Spider-Man', 'Batman', 'Superman', 'Wonder Woman', 'Black Panther',
      'The Hunger Games', 'Twilight', 'Mean Girls', 'Clueless', 'Legally Blonde',
      'The Notebook', 'Dirty Dancing', 'Pretty Woman', 'Top Gun', 'Ferris Bueller'
    ]
  },
  animals: {
    name: 'Animals',
    words: [
      'Elephant', 'Giraffe', 'Penguin', 'Kangaroo', 'Dolphin',
      'Cheetah', 'Gorilla', 'Flamingo', 'Octopus', 'Butterfly',
      'Crocodile', 'Peacock', 'Koala', 'Panda', 'Zebra',
      'Rhinoceros', 'Hippopotamus', 'Chimpanzee', 'Toucan', 'Jellyfish',
      'Seahorse', 'Armadillo', 'Hedgehog', 'Chameleon', 'Sloth',
      'Raccoon', 'Squirrel', 'Beaver', 'Otter', 'Walrus',
      'Polar Bear', 'Grizzly Bear', 'Wolf', 'Fox', 'Deer',
      'Moose', 'Buffalo', 'Camel', 'Llama', 'Alpaca',
      'Parrot', 'Eagle', 'Owl', 'Hummingbird', 'Pelican',
      'Shark', 'Whale', 'Lobster', 'Crab', 'Starfish'
    ]
  },
  food: {
    name: 'Food & Drinks',
    words: [
      'Pizza', 'Hamburger', 'Spaghetti', 'Sushi', 'Tacos',
      'Ice Cream', 'Chocolate Cake', 'French Fries', 'Hot Dog', 'Pancakes',
      'Burrito', 'Nachos', 'Fried Chicken', 'Caesar Salad', 'Cheesecake',
      'Apple Pie', 'Donuts', 'Waffles', 'Lobster', 'Shrimp Cocktail',
      'Grilled Cheese', 'Peanut Butter', 'Scrambled Eggs', 'Bacon', 'Avocado Toast',
      'Smoothie', 'Milkshake', 'Lemonade', 'Coffee', 'Hot Chocolate',
      'Popcorn', 'Cotton Candy', 'Pretzel', 'Bagel', 'Croissant',
      'Macaroni and Cheese', 'Mashed Potatoes', 'Corn on the Cob', 'Garlic Bread', 'Onion Rings',
      'Buffalo Wings', 'Spring Rolls', 'Dumplings', 'Ramen', 'Pad Thai',
      'Fish and Chips', 'Banana Split', 'Brownie', 'Cinnamon Roll', 'Churros'
    ]
  },
  sports: {
    name: 'Sports',
    words: [
      'Basketball', 'Football', 'Soccer', 'Baseball', 'Tennis',
      'Golf', 'Swimming', 'Volleyball', 'Hockey', 'Skiing',
      'Snowboarding', 'Surfing', 'Skateboarding', 'Boxing', 'Wrestling',
      'Gymnastics', 'Track and Field', 'Marathon', 'Cycling', 'Rowing',
      'Archery', 'Fencing', 'Karate', 'Judo', 'Taekwondo',
      'Bowling', 'Darts', 'Billiards', 'Table Tennis', 'Badminton',
      'Rugby', 'Cricket', 'Lacrosse', 'Water Polo', 'Diving',
      'Figure Skating', 'Speed Skating', 'Bobsled', 'Curling', 'Polo',
      'Rodeo', 'Bull Riding', 'Rock Climbing', 'Bungee Jumping', 'Skydiving',
      'Hang Gliding', 'Windsurfing', 'Kayaking', 'Rafting', 'Triathlon'
    ]
  },
  actions: {
    name: 'Actions',
    words: [
      'Dancing', 'Singing', 'Cooking', 'Painting', 'Driving',
      'Flying', 'Swimming', 'Running', 'Jumping', 'Climbing',
      'Sleeping', 'Dreaming', 'Laughing', 'Crying', 'Sneezing',
      'Yawning', 'Whistling', 'Clapping', 'Waving', 'Pointing',
      'Typing', 'Writing', 'Reading', 'Studying', 'Teaching',
      'Shopping', 'Cleaning', 'Gardening', 'Fishing', 'Camping',
      'Hiking', 'Jogging', 'Stretching', 'Meditating', 'Praying',
      'Hugging', 'Kissing', 'Shaking Hands', 'High Five', 'Fist Bump',
      'Texting', 'Calling', 'Taking a Selfie', 'Scrolling', 'Binge Watching',
      'Barbecuing', 'Baking', 'Juggling', 'Magic Trick', 'Karaoke'
    ]
  }
} as const;

export type CategoryId = keyof typeof categories;

export function getRandomWord(categoryId: CategoryId): string {
  const words = categories[categoryId].words;
  return words[Math.floor(Math.random() * words.length)];
}

export function shuffleWords(categoryId: CategoryId): string[] {
  const words = [...categories[categoryId].words];
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
}

