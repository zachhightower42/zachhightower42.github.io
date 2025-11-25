The Remington Community Home Owners’ Association wants to allow residents of the community to register to get community news and events through an online portal. The community organizers must register each new address before it allows a new resident to register for the community portal. In order to register for a property, the property key must be entered by the resident. The portal tailors the information on each resident’s page to give age-appropriate community activities for residents. If a member of the family is in the age range for registered activities, then that activity will appear on the family’s/user’s page. Activities can be created by any resident and they become the responsible person for the activity. When creating a new activity, a small description must be included for the activity and can only be modified (which includes deletion) by the community organizers or the activity creator. Before an activity can be posted it must first be approved by a community organizer.

## Resident


| name               | type    | key status | key info      |
| ------------------ | ------- | ---------- | ------------- |
| resident_id        | int     | PK         | (resident_id) |
| resident_user_name | varchar |            |               |
| resident_password  | varchar |            |               |
| resident_birthday  | date    |            |               |
| resident_last_name | varchar |            |               |

## Property


| name             | type    | key status | key info      |
| ---------------- | ------- | ---------- | ------------- |
| property_id      | int     | PK         | (property_id) |
| property_name    | varchar |            |               |
| property_desc    | text    |            |               |
| property_address | text    |            |               |

## Resident-Property Join

| name        | type | key status | key info                    |
| ----------- | ---- | ---------- | --------------------------- |
| property_id | int  | PK, FK     | (resident_id + property_id) |
| resident_id | int  | PK, FK     | (resident_id + property_id) |

## Activities

| name                | type    | key status | key info                           |
| ------------------- | ------- | ---------- | ---------------------------------- |
| activity_id         | int     | PK         |                                    |
| activity_desc       | text    |            |                                    |
| activity_creator_id | int     | FK         | resident_id -> activity_creator_id |
| activity_approval   | boolean |            |                                    |
| activity_location   | int     | FK         | activity_location -> property_id   |
# Relationships
Resident <-ManytoMany-> Property
Resident -1toMany-> Activities
Properties -1toMany-> Activities