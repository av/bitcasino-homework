# Bitcasino Homework

> Please, note that I've approached this homework as if I'd be working on it in a context of a much larger project. Aiming for something leaner, I'd arrange it in a fashion similar to how https://av.codes is [built](https://github.com/av/av).

## Features

- Basic GraphQL setup with Apollo
- Using Tailwind.css as a style driver
- Basic (but type-aware) global state management with `useReducer` and friends
- Custom `<Typeahead />` component built with hooks
- Custom `<Input />` component with floating label (works on any background)
- Animations using Framer Motion

## Setup & run

Just as you'd expect, clone and install all the deps

```bash
git clone git@github.com:av/bitcasino-homework.git
cd bitcasino-homework
yarn
```

To launch locally

```bash
yarn dev
```

It's also deployed to the [https://bitcasino-homework.vercel.app/](https://bitcasino-homework.vercel.app/)

## Tests

It would be great to cover this homework with proper tests, but unfortunately it took me slightly longer than I anticipated.
I'm including a few tests, however, to highlight that I'd write them, given enough time:

- utils module test
- Screens component test
- sample E2E test, using TestCafe

## Notes & Improvements

I approached this homework from a slightly ambitious side, implementing it like it's a part of larger already existing codebase. That struck me from the side of needing to cover all the bases which would've been written a long time before in such a codebase.

However, you may find some of the bases I've still managed to cover interesting:

- Typeahead from scratch with hooks
- Animated Screens and List components
- Global State without Redux

All being said, I'd wish to spend more time on certain behaviors to polish them a bit more.