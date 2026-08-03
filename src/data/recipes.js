export const recipes = [
  {
    id: "paneer",
    title: "Paneer Butter Masala",
    category: "indian",
    image: "/images food/Paneer Butter Masala.webp",
    description: "Rich and creamy North Indian curry made with paneer, tomatoes, butter, and aromatic spices.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Paneer", defaultQty: "200g", price: 120 },
      { name: "Onion", defaultQty: "1 medium", price: 20 },
      { name: "Tomatoes", defaultQty: "2 pcs", price: 30 },
      { name: "Fresh Cream", defaultQty: "1/2 cup", price: 50 },
      { name: "Butter", defaultQty: "1/2 cup", price: 40 },
      { name: "Ginger-Garlic Paste", defaultQty: "1 tsp", price: 15 },
      { name: "Garam Masala", defaultQty: "1 tsp", price: 25 },
      { name: "Red Chili Powder", defaultQty: "1 tsp", price: 10 },
      { name: "Turmeric Powder", defaultQty: "1/2 tsp", price: 10 },
      { name: "Fresh Coriander", defaultQty: "1 bunch", price: 10 }
    ],
    instructions: [
      "Heat butter in a pan and sauté onions until golden brown.",
      "Add ginger-garlic paste and sauté for 2 minutes until fragrant.",
      "Add tomato puree, red chili powder, turmeric, and garam masala. Cook for 5-7 minutes.",
      "Stir in cream and cook for another 3-5 minutes on low heat.",
      "Add paneer cubes and cook for 5 minutes, allowing flavors to infuse.",
      "Garnish with fresh coriander and serve hot with naan or rice."
    ]
  },
  {
    id: "masala-dosa",
    title: "Masala Dosa",
    category: "indian",
    image: "/images food/Masala Dosa.webp",
    description: "A crispy, golden-brown crepe filled with spiced mashed potato filling, served with chutney and sambar.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Rice", defaultQty: "1 kg", price: 40 },
      { name: "Split Urad Dal", defaultQty: "250g", price: 30 },
      { name: "Fenugreek Seeds", defaultQty: "50g", price: 10 },
      { name: "Boiled Potatoes", defaultQty: "4 pcs", price: 10 },
      { name: "Mustard Seeds", defaultQty: "50g", price: 5 },
      { name: "Cumin Seeds", defaultQty: "50g", price: 5 },
      { name: "Onion", defaultQty: "1 pc", price: 5 },
      { name: "Ginger", defaultQty: "50g", price: 5 },
      { name: "Coriander Leaves", defaultQty: "1 bunch", price: 5 },
      { name: "Garam Masala", defaultQty: "50g", price: 20 }
    ],
    instructions: [
      "For batter: Soak rice, urad dal, and fenugreek seeds for 6-8 hours. Grind to smooth batter and ferment 12-24 hours.",
      "For filling: Heat oil, add mustard, cumin, onions, chilies, ginger, turmeric, and mashed potatoes. Cook 5 mins.",
      "Spread thin batter on hot tawa, drizzle ghee, cook till golden brown.",
      "Place potato filling in center, fold and serve hot with coconut chutney and sambar."
    ]
  },
  {
    id: "salad",
    title: "Greek Salad",
    category: "western",
    image: "/images food/greensalad.webp",
    description: "Fresh, crispy, and healthy Mediterranean salad with feta cheese and olives.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Cucumbers", defaultQty: "2 pcs", price: 30 },
      { name: "Cherry Tomatoes", defaultQty: "200g", price: 45 },
      { name: "Feta Cheese", defaultQty: "100g", price: 90 },
      { name: "Kalamata Olives", defaultQty: "50g", price: 60 },
      { name: "Red Onion", defaultQty: "1 pc", price: 15 },
      { name: "Extra Virgin Olive Oil", defaultQty: "2 tbsp", price: 40 },
      { name: "Dried Oregano", defaultQty: "1 tsp", price: 15 }
    ],
    instructions: [
      "Chop cucumbers, tomatoes, and red onion into bite-sized pieces.",
      "Combine all vegetables in a large salad bowl.",
      "Add olives and block of feta cheese on top.",
      "Drizzle generously with extra virgin olive oil and sprinkle dried oregano.",
      "Toss gently right before serving cold."
    ]
  },
  {
    id: "biryani",
    title: "Veg Biryani",
    category: "indian",
    image: "/images food/Biryani3.webp",
    description: "Flavored basmati rice layered with spiced vegetables, saffron, and aromatic herbs.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Basmati Rice", defaultQty: "500g", price: 80 },
      { name: "Mixed Vegetables", defaultQty: "300g", price: 60 },
      { name: "Biryani Masala", defaultQty: "50g", price: 35 },
      { name: "Curd / Yogurt", defaultQty: "1 cup", price: 25 },
      { name: "Ghee", defaultQty: "3 tbsp", price: 50 },
      { name: "Mint & Coriander", defaultQty: "1 bunch", price: 15 },
      { name: "Saffron Milk", defaultQty: "1/4 cup", price: 30 }
    ],
    instructions: [
      "Soak basmati rice for 30 minutes and cook until 70% done.",
      "Marinate chopped vegetables with curd, biryani masala, mint, and salt.",
      "In a heavy bottom pot, cook marinated veggies until tender.",
      "Layer rice over veggies, sprinkle saffron milk, fried onions, and ghee.",
      "Cover tightly and cook on low dum for 20 minutes."
    ]
  },
  {
    id: "aloo-paratha",
    title: "Aloo Paratha",
    category: "indian",
    image: "/images food/Aloo Paratha4.jpeg",
    description: "Stuffed flatbread filled with spiced mashed potatoes and cooked to golden perfection.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Wheat Flour", defaultQty: "1 kg", price: 40 },
      { name: "Boiled Potatoes", defaultQty: "3 pcs", price: 10 },
      { name: "Green Chili", defaultQty: "2 pcs", price: 5 },
      { name: "Cumin Seeds", defaultQty: "50g", price: 20 },
      { name: "Garam Masala", defaultQty: "50g", price: 25 },
      { name: "Red Chili Powder", defaultQty: "50g", price: 15 },
      { name: "Butter / Ghee", defaultQty: "250ml", price: 50 }
    ],
    instructions: [
      "Knead wheat flour with water into soft dough and rest for 20 mins.",
      "Mash potatoes and mix in green chili, cumin, garam masala, and salt.",
      "Roll dough into small circles, stuff potato mixture, seal and roll gently.",
      "Cook on hot tawa with butter/ghee until golden spots appear on both sides.",
      "Serve hot with curd or pickle."
    ]
  },
  {
    id: "chole",
    title: "Chole Bhature",
    category: "indian",
    image: "/images food/Chole Bhature.jpeg",
    description: "Spicy Punjabi chickpea curry served with hot, fluffy fried bread.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Chickpeas (Kabuli Chana)", defaultQty: "250g", price: 50 },
      { name: "Maida (All Purpose Flour)", defaultQty: "500g", price: 35 },
      { name: "Chole Masala", defaultQty: "50g", price: 30 },
      { name: "Onions & Tomatoes", defaultQty: "300g", price: 30 },
      { name: "Tea Bags (for dark color)", defaultQty: "2 pcs", price: 10 },
      { name: "Oil for Frying", defaultQty: "500ml", price: 70 }
    ],
    instructions: [
      "Soak chickpeas overnight and pressure cook with tea bag for dark rich color.",
      "Prepare onion-tomato gravy with aromatic chole masala.",
      "Simmer chickpeas in the gravy until thick and flavorful.",
      "Knead maida with yogurt into dough, roll into ovals and deep fry into fluffy bhature.",
      "Serve hot with onions and lemon wedge."
    ]
  },
  {
    id: "samosa",
    title: "Crispy Samosa",
    category: "snacks",
    image: "/images food/Samosa.webp",
    description: "Crispy fried pastry filled with spicy mashed potatoes, green peas, and spices.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Maida Flour", defaultQty: "250g", price: 25 },
      { name: "Boiled Potatoes", defaultQty: "4 pcs", price: 15 },
      { name: "Green Peas", defaultQty: "100g", price: 20 },
      { name: "Ajwain (Carom seeds)", defaultQty: "1 tsp", price: 10 },
      { name: "Amchur (Mango powder)", defaultQty: "1 tsp", price: 15 },
      { name: "Oil for Frying", defaultQty: "500ml", price: 70 }
    ],
    instructions: [
      "Knead firm dough using maida, ghee, ajwain, salt and ice water.",
      "Sauté potatoes, peas, spices, and amchur for filling.",
      "Shape dough cones, fill potato mixture, seal edges with water.",
      "Deep fry on low-medium heat until golden and crispy.",
      "Serve with mint and tamarind chutney."
    ]
  },
  {
    id: "pakora",
    title: "Crispy Veg Pakora",
    category: "snacks",
    image: "/images food/pakora.webp",
    description: "Deep-fried fritters made with sliced vegetables and seasoned gram flour batter.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Besan (Gram Flour)", defaultQty: "250g", price: 35 },
      { name: "Sliced Onions & Potatoes", defaultQty: "300g", price: 25 },
      { name: "Spinach / Palak", defaultQty: "100g", price: 15 },
      { name: "Chili Powder & Carom", defaultQty: "1 tsp", price: 10 },
      { name: "Oil for Frying", defaultQty: "500ml", price: 70 }
    ],
    instructions: [
      "Mix besan, spices, carom seeds, and water into thick batter.",
      "Add sliced onions, potatoes, and spinach leaves.",
      "Drop small spoonfuls into hot oil and fry until crisp and golden brown.",
      "Drain excess oil and serve hot with chai!"
    ]
  },
  {
    id: "pavbhaji",
    title: "Butter Pav Bhaji",
    category: "snacks",
    image: "/images food/Pav Bhaji.jpeg",
    description: "Spicy mashed vegetable curry topped with generous butter, served with soft toasted rolls.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Pav Buns", defaultQty: "1 pack (6 pcs)", price: 30 },
      { name: "Butter", defaultQty: "200g", price: 60 },
      { name: "Mixed Veggies (Potato, Cauliflower, Peas)", defaultQty: "500g", price: 50 },
      { name: "Pav Bhaji Masala", defaultQty: "50g", price: 30 },
      { name: "Capsicum & Tomato", defaultQty: "200g", price: 25 }
    ],
    instructions: [
      "Boil and thoroughly mash potatoes, cauliflower, and green peas.",
      "Sauté onions, capsicum, tomatoes in butter with pav bhaji masala.",
      "Mix mashed veggies, add water, butter, and simmer for 15 minutes.",
      "Toast pav buns on tawa with plenty of butter.",
      "Serve hot garnished with chopped onions and lemon."
    ]
  },
  {
    id: "vada",
    title: "Mumbai Vada Pav",
    category: "snacks",
    image: "/images food/vadapav.jpeg",
    description: "Mumbai's favorite street snack featuring spicy potato fritter inside a soft pav with garlic chutney.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Pav Bread", defaultQty: "1 pack", price: 30 },
      { name: "Potatoes", defaultQty: "4 pcs", price: 15 },
      { name: "Besan (Gram Flour)", defaultQty: "200g", price: 30 },
      { name: "Garlic Chutney Powder", defaultQty: "50g", price: 20 },
      { name: "Mustard & Curry Leaves", defaultQty: "1 pack", price: 10 }
    ],
    instructions: [
      "Make tempered potato balls seasoned with mustard, curry leaves, and turmeric.",
      "Dip balls in seasoned besan batter.",
      "Deep fry until golden vadas are formed.",
      "Slit pav, spread dry garlic chutney, insert vada and fried green chili."
    ]
  },
  {
    id: "bhelpuri",
    title: "Chatpata Bhel Puri",
    category: "snacks",
    image: "/images food/bhel.jpg",
    description: "Crunchy puffed rice snack tossed with tangy tamarind chutney, mint, onions, and sev.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Puffed Rice (Murmura)", defaultQty: "200g", price: 20 },
      { name: "Nylon Sev", defaultQty: "100g", price: 25 },
      { name: "Tamarind Chutney", defaultQty: "100ml", price: 30 },
      { name: "Green Chutney", defaultQty: "100ml", price: 30 },
      { name: "Boiled Potato & Onion", defaultQty: "150g", price: 15 },
      { name: "Papdi", defaultQty: "1 pack", price: 20 }
    ],
    instructions: [
      "In a large bowl, place crisp puffed rice and crushed papdi.",
      "Add boiled potatoes, chopped onions, and tomatoes.",
      "Drizzle sweet tamarind chutney and spicy green chutney.",
      "Toss quickly and top with generous nylon sev and coriander."
    ]
  },
  {
    id: "momos",
    title: "Steamed Veg Momos",
    category: "snacks",
    image: "/images food/momos.webp",
    description: "Delicate steamed dumplings stuffed with finely minced vegetables and served with spicy red chili sauce.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Maida Flour", defaultQty: "250g", price: 25 },
      { name: "Cabbage & Carrots", defaultQty: "300g", price: 30 },
      { name: "Spring Onion & Garlic", defaultQty: "100g", price: 20 },
      { name: "Soy Sauce & Black Pepper", defaultQty: "1 bottle", price: 35 },
      { name: "Red Chili Momo Sauce", defaultQty: "1 bottle", price: 40 }
    ],
    instructions: [
      "Roll thin dough circles from smooth maida dough.",
      "Sauté finely minced cabbage, carrots, spring onions with soy sauce.",
      "Fill center with vegetable mixture, pleat and seal edges.",
      "Steam momos in steamer for 10-12 minutes until translucent.",
      "Serve piping hot with fiery red momo chutney."
    ]
  },
  {
    id: "mangolassi",
    title: "Fresh Mango Lassi",
    category: "beverage",
    image: "/images food/mangolassi.jpg",
    description: "Refreshing, rich yogurt-based drink blended with sweet ripe mango pulp and cardamom.",
    popular: true,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Ripe Mangoes / Pulp", defaultQty: "2 pcs", price: 60 },
      { name: "Fresh Thick Yogurt", defaultQty: "400g", price: 40 },
      { name: "Milk", defaultQty: "100ml", price: 10 },
      { name: "Sugar", defaultQty: "3 tbsp", price: 10 },
      { name: "Cardamom Powder & Pistachios", defaultQty: "1 pack", price: 25 }
    ],
    instructions: [
      "Peel mangoes and extract ripe pulp.",
      "In a blender, combine mango pulp, chilled yogurt, milk, and sugar.",
      "Blend on high speed until thick and velvety.",
      "Pour into tall glasses and garnish with cardamom powder and chopped pistachios."
    ]
  },
  {
    id: "butternaan",
    title: "Garlic Butter Naan",
    category: "indian",
    image: "/images food/Butter Naan1.jpeg",
    description: "Soft Indian flatbread brushed with garlic butter, cooked in tandoor style.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Maida Flour", defaultQty: "500g", price: 35 },
      { name: "Yogurt", defaultQty: "100g", price: 15 },
      { name: "Butter", defaultQty: "100g", price: 50 },
      { name: "Minced Garlic & Nigella seeds", defaultQty: "50g", price: 20 }
    ],
    instructions: [
      "Knead maida with yogurt, baking powder, salt, and warm water.",
      "Rest dough for 2 hours.",
      "Roll teardrop shapes, sprinkle minced garlic and nigella seeds.",
      "Cook on hot tawa until puffed and charred, brush heavily with melted butter."
    ]
  },
  {
    id: "idlisambar",
    title: "Steamed Idli Sambar",
    category: "indian",
    image: "/images food/idlisambar.webp",
    description: "Puffy steamed rice cakes served with hot lentil vegetable sambar and coconut chutney.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Idli Batter", defaultQty: "1 kg", price: 60 },
      { name: "Toor Dal (Pigeon Peas)", defaultQty: "250g", price: 40 },
      { name: "Sambar Masala", defaultQty: "50g", price: 25 },
      { name: "Fresh Coconut", defaultQty: "1 pc", price: 30 },
      { name: "Drumsticks & Vegetables", defaultQty: "200g", price: 25 }
    ],
    instructions: [
      "Pour fermented idli batter into greased idli molds.",
      "Steam for 10-12 minutes until soft and spongy.",
      "Cook toor dal with sambar powder, tamarind, and vegetables.",
      "Grind coconut, green chilies, and roasted chana dal for coconut chutney.",
      "Serve warm idlis drenched in piping hot sambar."
    ]
  },
  {
    id: "malaikofta",
    title: "Royal Malai Kofta",
    category: "indian",
    image: "/images food/malaikofta.jpg",
    description: "Melt-in-your-mouth paneer potato koftas in a rich, mildly sweet cashew cashew-cream gravy.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Paneer & Boiled Potato", defaultQty: "300g", price: 80 },
      { name: "Cashews & Melon Seeds", defaultQty: "100g", price: 70 },
      { name: "Fresh Cream", defaultQty: "100ml", price: 40 },
      { name: "Kasturi Methi & Khoya", defaultQty: "50g", price: 40 }
    ],
    instructions: [
      "Mash paneer and potato together, shape into balls stuffed with chopped raisins/nuts.",
      "Deep fry koftas until pale golden brown.",
      "Prepare smooth white/orange gravy using onion, cashew paste, cream, and subtle spices.",
      "Place fried koftas in serving dish and pour warm gravy on top right before eating."
    ]
  },
  {
    id: "palakpaneer",
    title: "Palak Paneer",
    category: "indian",
    image: "/images food/palakpaneer.jpg",
    description: "Cubes of fresh paneer cooked in a silky spinach puree flavored with garlic and spices.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Fresh Spinach (Palak)", defaultQty: "500g", price: 30 },
      { name: "Paneer", defaultQty: "200g", price: 120 },
      { name: "Garlic & Green Chilies", defaultQty: "50g", price: 15 },
      { name: "Cream & Garam Masala", defaultQty: "1 pack", price: 35 }
    ],
    instructions: [
      "Blanch spinach leaves in boiling water for 2 mins, shock in ice water, and blend into smooth puree.",
      "Sauté finely chopped garlic and chilies in ghee until aromatic.",
      "Add spinach puree, salt, spices and simmer for 5 minutes.",
      "Gently fold paneer cubes into gravy and finish with a swirl of cream."
    ]
  },
  {
    id: "spaghetti",
    title: "Classic Spaghetti Bolognese",
    category: "western",
    image: "/images food/Spaghetti Bolognese.jpeg",
    description: "Classic Italian spaghetti tossed in rich tomato basil sauce with parmesan cheese.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Spaghetti Pasta", defaultQty: "400g", price: 65 },
      { name: "Canned Tomatoes / Marinara", defaultQty: "400g", price: 55 },
      { name: "Parmesan Cheese", defaultQty: "50g", price: 80 },
      { name: "Italian Herbs & Garlic", defaultQty: "1 pack", price: 30 }
    ],
    instructions: [
      "Boil spaghetti in salted water until al dente.",
      "Sauté garlic, onions, Italian herbs in olive oil.",
      "Add tomato puree and simmer until thick sauce forms.",
      "Toss hot spaghetti into sauce and serve with grated parmesan cheese."
    ]
  },
  {
    id: "vegpulao",
    title: "Mild Veg Pulao",
    category: "indian",
    image: "/images food/pulav.jpg",
    description: "Fragrant basmati rice cooked with whole spices, green peas, carrots, and sweet corn.",
    popular: false,
    youtubeUrl: "https://www.youtube.com/embed/W4FSf_VPqlc",
    ingredients: [
      { name: "Basmati Rice", defaultQty: "500g", price: 80 },
      { name: "Green Peas, Carrots, Beans", defaultQty: "300g", price: 40 },
      { name: "Whole Spices (Cardamom, Cloves, Bay leaf)", defaultQty: "1 pack", price: 25 },
      { name: "Ghee", defaultQty: "2 tbsp", price: 30 }
    ],
    instructions: [
      "Heat ghee in cooker and crackle whole spices.",
      "Add vegetables and washed basmati rice, sauté for 2 minutes.",
      "Add water and cook on medium flame for 2 whistles.",
      "Fluff rice gently with a fork and serve hot with raita."
    ]
  }
];
