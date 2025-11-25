**User login information**

| Field    | Type         | null | key     | default |
| -------- | ------------ | ---- | ------- | ------- |
| id       | int unsigned | no   | private | null    |
| name     | varchar      | no   |         | null    |
| email    | varchar      | no   |         | null    |
| password | varchar      | no   |         | null    |
**World info**

| Field       | Type         | null | key     | default |
| ----------- | ------------ | ---- | ------- | ------- |
| id          | int unsigned | no   | private | null    |
| name        | varchar      | no   |         | null    |
| user        | varchar      | no   |         | null    |
| last_edited | date         | no   |         | null    |
| icon_path   | varchar      | no   |         | null    |

**Location info**

| Field       | Type         | null | key     | default |
| ----------- | ------------ | ---- | ------- | ------- |
| id          | int unsigned | no   | private | null    |
| name        | varchar      | no   |         | null    |
| user        | varchar      | no   |         | null    |
| last_edited | date         | no   |         | null    |
| icon_path   | varchar      | no   |         | null    |
| world       | varchar      | no   |         | null    |
**Entry info**

| Field       | Type         | null | key     | default |
| ----------- | ------------ | ---- | ------- | ------- |
| id          | int unsigned | no   | private | null    |
| name        | varchar      | no   |         | null    |
| user        | varchar      | no   |         | null    |
| last_edited | date         | no   |         | null    |
| icon_path   | varchar      | no   |         | null    |
| world       | varchar      | no   |         | null    |
| location    | varchar      | no   |         | null    |
