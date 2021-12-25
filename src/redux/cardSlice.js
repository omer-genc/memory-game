import { createSlice, nanoid } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: "card",
    initialState: {
        items: [
            {
                name: "yarn",
                matched: false,
                opened: false,

            },
            {
                name: "react",
                matched: false,
                opened: false,
            },
            {
                name: "vue",
                matched: false,
                opened: false,
            },
            {
                name: "angular2",
                matched: false,
                opened: false,
            },
            {
                name: "grunt",
                matched: false,
                opened: false,
            },
            {
                name: "phantomjs",
                matched: false,
                opened: false,
            },
            {
                name: "ember",
                matched: false,
                opened: false,
            },
            {
                name: "babel",
                matched: false,
                opened: false,
            },
            // {
            //     name: "ionic",
            //     matched: false,
            //     opened: false,
            // },
            // {
            //     name: "gulp",
            //     matched: false,
            //     opened: false,
            // },
            // {
            //     name: "meteor",
            //     matched: false,
            //     opened: false,
            // },
            // {
            //     name: "yeoman",
            //     matched: false,
            //     opened: false,
            // },
            // {
            //     name: "nodejs",
            //     matched: false,
            //     opened: false,
            // },
            // {
            //     name: "bower",
            //     matched: false,
            //     opened: false,
            // },
            // {
            //     name: "browserify",
            //     matched: false,
            //     opened: false,
            // },
        ],
        score: 0,
        opened: [],
        duplicates: [],
        matched: [],
    },
    reducers: {
        openCard: (state, action) => {
            const { id } = action.payload;
            const item = state.duplicates.find(item => item.id === id);
            if (item.opened)
                return;
            item.opened = true;
            state.opened.push(item);
        },
        closeCard: (state, action) => {
            const { id } = action.payload;
            const item = state.duplicates.find(item => item.id === id);
            if (!item.opened)
                return;
            item.opened = false;
            state.opened = state.opened.filter(item => item.id !== id);
            state.score -= 5;
        },
        dublicateItems: (state, action) => {
            let newItems = [...state.items, ...state.items];
            state.duplicates = newItems.map(item => {
                return { ...item, id: nanoid() };
            });
        },
        suffleItems: (state, action) => {
            const shuffle = (array) => {
                let currentIndex = array.length, randomIndex;
                while (currentIndex !== 0) {

                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                }

                return array;
            }

            shuffle(state.duplicates);
        },
        matched: (state, action) => {
            const { id } = action.payload;
            const item = state.duplicates.find(item => item.id === id);
            if (item.matched)
                return;
            item.matched = true;
            state.matched.push(item);
            state.opened.pop();
            state.score += 25;
        },
        resetGame: (state, action) => {
            state.duplicates = [];
            state.opened = [];
            state.matched = [];
            state.score = 0;
        },
    }
})

export const itemSelector = (state) => state.card.items;
export const scoreSelector = (state) => state.card.score;
export const openedSelector = (state) => state.card.opened;
export const duplicatesSelector = (state) => state.card.duplicates;
export const matchedSelector = (state) => state.card.matched;

export const {
    openCard,
    closeCard,
    dublicateItems,
    suffleItems,
    matched,
    resetGame
} = cardSlice.actions;
export default cardSlice.reducer;