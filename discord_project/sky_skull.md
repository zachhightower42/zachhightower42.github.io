# Sky Skull

Sky Skull is a Discord app designed to streamline scheduling and reminders for roleplaying games and interactions.

---

## 1. Overview

Sky Skull helps game masters and players coordinate game sessions, vote on schedules, receive reminders, and manage game events directly within Discord.

---

## 2. Features

- Game creation and management
- Group and user management
- Scheduling polls with time zone conversion
- Automated Discord event creation
- Customizable reminders for players
- Game links posting (Roll20, Forge, etc.)
- Player availability profiles
- Searchable availability for game masters

---

## 3. User Roles

**Game Master**
- Create/manage games and groups
- Schedule sessions and polls
- View player availability
- Manage reminders and events

**Player**
- Vote on schedules
- Set and manage reminders
- Update availability profile

---

## 4. Architecture

- **Bot Framework:** Discord.js (Node.js)
- **Database:** MongoDB or PostgreSQL for persistent storage
- **Scheduler:** Node cron or similar for reminders
- **Frontend:** Discord UI (slash commands, modals, embeds)
- **Hosting:** Cloud VM or serverless (e.g., AWS Lambda)

---

## 5. Data Models

- **User:** Discord ID, name, availability profile, reminder preferences
- **Group:** Name, members (user IDs), associated games
- **Game:** Name, description, title card, scheduled intervals, group, poll, event link
- **Poll:** Game ID, options (date/time), votes (user IDs)
- **Event:** Discord event ID, game reference, channel, start time
- **Reminder:** User ID, game ID, times, status

---

## 6. Discord Integration

- **Roles:** Create/manage roles for game groups
- **Events:** Create Discord events for scheduled games
- **Channels:** Post messages and game links
- **Messaging:** DM reminders and notifications
- **Commands:** Slash commands for all bot actions

---

## 7. Scheduling & Reminders

- Game master selects intervals via calendar/clock picker
- Bot creates poll with time zone conversion
- Poll closes after 24 hours (configurable)
- Reminders sent via DM at chosen intervals (24h, 12h, 1h, custom)
- Players can update reminders and availability via commands

---

## 8. Voting System

- Poll created for proposed game times
- Players vote on preferred intervals or "None of these work"
- Bot tallies votes and selects majority time
- Game master can override if needed

---

## 9. Game Links & Hosting Support

- Support for Roll20, Forge, and other platforms
- Game master provides link during setup
- Bot posts link in event channel at game start

---

## 10. UI/UX

- Discord slash commands for all actions
- Modals for input (game info, reminders)
- Embeds for poll display and event info
- Time zone conversion shown in poll options
- Availability shown as list or colored calendar

---

## 11. Security & Permissions

- Only game masters can manage games/groups
- Players can only modify their own reminders/availability
- Discord authentication for all actions
- Data privacy for reminders and availability

---

## 12. Testing

- Unit tests for bot commands and logic
- Integration tests for Discord API interactions
- Mock database for test environment
- Manual testing for UI/UX flows

---

## 13. Deployment

- Setup environment variables for Discord bot token, DB credentials
- Deploy bot to cloud VM or serverless platform
- Monitor uptime and error logs
- Regular backups of database

---

## 14. Future Enhancements

- Dice rolling system
- Cross-server game tracking
- Event log helper functions
- Mini-game scheduling support

---

## 15. Project Structure

Recommended folder and file organization for maintainability and scalability:

```
sky_skull/
├── src/
│   ├── bot.ts                # Bot entry point
│   ├── commands/             # Slash command handlers
│   ├── events/               # Discord event listeners
│   ├── models/               # Data models (User, Game, Group, Poll, etc.)
│   ├── services/             # Business logic (scheduling, reminders, voting)
│   ├── utils/                # Utility functions (time zone conversion, validation)
│   └── config/               # Configuration files (env, constants)
├── tests/                    # Unit and integration tests
├── package.json              # Node.js dependencies and scripts
├── README.md                 # Project documentation
└── .env                      # Environment variables (not committed)
```

- **src/bot.ts**: Initializes the Discord client and loads commands/events.
- **src/commands/**: Contains individual command files (e.g., createGame.ts, votePoll.ts).
- **src/events/**: Handles Discord events (e.g., messageCreate, interactionCreate).
- **src/models/**: Defines TypeScript interfaces/classes for data entities.
- **src/services/**: Implements core logic (scheduling, reminders, poll management).
- **src/utils/**: Helper functions for time zones, formatting, etc.
- **src/config/**: Configuration and constants.
- **tests/**: Automated tests for commands, services, and models.

---

## 16. Core Slash Commands

Sky Skull's main functionality is accessed via Discord slash commands. Below are the core commands and their usage:

### `/creategame`
- **Description:** Create a new game session and associate it with a group.
- **Usage:** `/creategame name:<Game Name> description:<Description> group:<Group Name> link:<Game Link>`
- **Permissions:** Game Master only.

### `/schedulegame`
- **Description:** Propose times for a game session and create a scheduling poll.
- **Usage:** `/schedulegame game:<Game Name> options:<Date/Time Options>`
- **Permissions:** Game Master only.

### `/vote`
- **Description:** Vote on available time slots in a scheduling poll.
- **Usage:** `/vote poll:<Poll ID> option:<Selected Option>`
- **Permissions:** Player only.

### `/remindme`
- **Description:** Set or update reminders for upcoming games.
- **Usage:** `/remindme game:<Game Name> time:<Reminder Time>`
- **Permissions:** Player only.

### `/availability`
- **Description:** Update your availability profile for scheduling.
- **Usage:** `/availability times:<Available Times>`
- **Permissions:** Player only.

### `/event`
- **Description:** Create a Discord event for a scheduled game.
- **Usage:** `/event game:<Game Name> channel:<Channel> time:<Start Time>`
- **Permissions:** Game Master only.

### `/gamelink`
- **Description:** Post the game link in the event channel.
- **Usage:** `/gamelink game:<Game Name>`
- **Permissions:** Game Master only.

### `/group`
- **Description:** Create or manage a group of players.
- **Usage:** `/group action:<create|add|remove> name:<Group Name> members:<User IDs>`
- **Permissions:** Game Master only.

### `/help`
- **Description:** List all available commands and usage.
- **Usage:** `/help`

---

These commands are implemented in `src/commands/` as individual handlers. See `src/commands/README.md` for detailed command structure and options.