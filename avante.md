# Profesor Rafał Wilczur - Architecture

Slack bot using `@slack/bolt` with Socket Mode. Entry point: `src/index.ts`

## Modular Architecture

### 1. Mention Features (`src/mentionFeatures/`)
Triggered by `@Profesor Rafał Wilczur` mentions. Each feature exports:
- `question`: string[] - trigger keywords
- `middleware`: async handler
- `matcher`: (optional) custom pattern matching

Flow: `app_mention` event → pattern matchers → keyword lookup → default to help

### 2. Message Features (`src/messageFeatures/`)
Pattern-based responses using `app.message(pattern, middleware)`

### 3. Member Events (`src/membersEvents/`)
React to `member_joined_channel` and `member_left_channel` events

### 4. Cron Features (`src/cronFeatures/`)
Scheduled jobs using `node-cron`. Each feature exports:
- `schedule`: string - cron expression (e.g., '0 9 * * 1-5')
- `handler`: async function with app parameter

Flow: App starts → cron jobs scheduled → handlers execute on schedule

## Structure
```
src/
├── index.ts              # App init
├── mentionFeatures/      # @mention features
├── messageFeatures/      # Pattern-based features
├── membersEvents/        # User activity handlers
├── cronFeatures/         # Scheduled jobs
└── utils/                # Shared utilities
```

## Adding Features
1. **Mention**: Create in `mentionFeatures/`, add to array in index, then update `src/mentionFeatures/help.ts` to document the new feature
2. **Message**: Create in `messageFeatures/`, use `app.message()`
3. **Event**: Create in `membersEvents/`, use `app.event()`
4. **Cron**: Create in `cronFeatures/`, add to features array in index

## Config (.env)
`SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `SLACK_APP_TOKEN`, `GROQ_API_KEY`, `PORT`, `MAIN_CHANNEL`
