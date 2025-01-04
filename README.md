# Profesor Rafał Wilczur

Profesor is a slack app for closed channel #znachorstwo.

## API

There are few methods to interact with Slack apps - mentions (just mentino app), commands (with `/` character) and app can listen on messages on the channels they joined. For now Profesor is using mention method for most features. I wanted to give it more conversation vibe.

You can mention Profesor on a slack channel and he may responds to you (`@Profesor Rafał Wilczur pomóż`). List of possible messages:

- `help` - Helper message with list of Profesors features.
- `hello` - Profesor will say hello to you
- `jak żyć?` - Profesor will give you a precious life advice
- `tarot` - Send you your daily tarot card
- `będzie dobrze?` - Profesor will tell you if will be good today or not
- `biorytm` - Profesor will count and send you your biorhythm
- `czy dam radę?` - Profesor will tell you if will handle your stuff

## Contribution

The app is created using NodeJS version of `@slack/bolt` framework. More info [here](https://slack.dev/bolt-js/tutorial/getting-started).

You can create new features or extend exiting ones. Contact me if you want to simply run development environment. Create branch from `main` and then create PR to it.

#### Mention features

I think mention features will be the best option for most ideas to keep communication with Profesor in human way :)
To create feature (works if user mention `@Profesor Rafał Wilczur` on Slack private channel):

- Create file in `src/mentionFeatures` - you can copy `src/mentionFeatures/_template.ts` for easy start.
- `question` is a string or array of strings. It's a list of possible messages which will trigger your feature. It's good to add few options for easier usage, for example additional ones without polish letters (`['pomóż', 'pomoz']`). Question coming from Slack is lowercased so Profesor is case insensitive for the users. Please write all your questions in lowercase.
- `middleware` is an async function which is triggered if user type one of your questions on slack after mentioning Profesor. it's good to end it with function `await say('Your answer or something')`.
- if your mention feature is ready you need to import and add it to the array in `src/mentionFeatures/index.ts`. Then it will be alive.
- Don't forget to document your feature here in `API` section and in `help` mention feature (`src/mentionFeatures/help.ts`).

#### Message features

These features are triggered if someone send a specific message in a channel. They are placed in `src/messageFeatures` catalog. To create one:

- Create file in `src/messageFeatures` - you can copy `_template.ts` file as well.
- Subscribe to listen to specific message by running `app.message(message, middleware)` - `message` can be a string or Regexp Don't forget to type `i` at the end of your expression to make Profesor case insensitive (`/^(do widzenia|do jutra).*/i`). `middleware` is an async function.
- import and run you message feature in `src/messageFeatures/index.ts`.
- I think sometimes it's not necessary to add these ones to `help` mention feature :thinking: They are kinda like casual reactions rather that some special features. But it depends on specific message feature I think :smile:

#### Member events

Events which listen on user activity. For now there are 2 of them:

- `member_joined_channel` - when some user joined the channel. Profesor invites new users.
- `member_left_channel` - when user left the channel. Profesor comments people who leave.

#### Utils

- `getRandomElement` - get random element from an array.
- `getFeatureObject` - creates object from questions array and middleware. Such object is used by Profesor to fast match correct middleware with the question in the event callback.

#### Env variables

If you feature requires some environment variables in the runtime you need to follow few steps:

- Add it to `.env.example` file.
- Add it to `./.github/workflows/deploy.yml` file inside `Setup and restart the app` section to add it to the VPS.
- Send variable name and value to GH repo admin to add it to secrets.

#### Development

To run the app locally:

```sh
cp .env.example .env # if you need values for variables ask GH repo admin for them

yarn
yarn dev
```

### TODO:

- Moon phases (requires new feature category `scheduledFeatures`)
- Horoscope
- More ideas please :)
