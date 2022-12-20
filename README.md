# Profesor Rafał Wilczur

Profesor is a slack app for closed channel #znachorstwo.

## API

There are few methods to interact with Slack apps - mentions (just mentino app), commands (with `/` character) and app can listen on messages on the channels they joined. For now Profesor is using mention method for most features. I wanted to give it more conversation vibe.

You can mention Profesor on a slack channel and he may responds to you (`@Profesor Rafał Wilczur pomóż`). List of possible messages:

- `help` - Helper message which lists Profesors features.
- `hello` - Profesor will say hello to you
- `jak żyć?` - Profesor will give you a precious life advice

## Contribution

The app is created using NodeJS version of `@slack/bolt` framework. More info [here](https://slack.dev/bolt-js/tutorial/getting-started).

You can create new features or extend exiting ones. Contact me if you want to simply run development environment. Create branch from `main` and then create PR to it.

#### Mention features

I think mention features will the best option for most ideas to keep communication with Profesor in human way :)
To create feature (works if user mention `@Profesor Rafał Wilczur` on Slack private channel):

- Create file in `src/mentionFeatures` - you can copy `src/mentionFeatures/template.ts` for easy start.
- `question` is a string or array of strings. It's a list of possible messages which will trigger your feature. It's good to add few options for easier usage, for example additional ones without polish letters (`['pomóż', 'pomoz']`). Question coming from Slack is lowercased so Profesor is case insensitive for the users. Please write all your questions in lowercase.
- `middleware` is an async function which is triggered if user type one of your questions on slack after mentioning Profesor. it's good to end it with function `await say('Your answer or something')`.
- if your mention feature is ready you need to import and add it to the array in `src/mentionFeatures/index.ts`. Then it will be alive.
- Don't forget to document your feature here in `API` section and in `help` mention feature (`src/mentionFeatures/help.ts`).

#### Utils

- `getRandomElement` - get random element from an array.
- `getFeatureObject` - creates object from questions array and middleware. Such object is used by Profesor to fast match correct middleware with the question in the event callback.

### TODO:

- Tarot cards
- Invitation for new joiners to the channel (subscribe special event for this)
- Moon phases
- Horoscope
- Biorhythm
- More ideas please :)
