# Title page
Pull from original MVP document, done
# Project overview
Reword initial paragraph of MVP document
# User reqs
- Pull MVP, reword a little so that it functions, better. E.g. making tech less specific
- Describe different system user types
	- Admin
		- As an admin, I want to x so that I can y
	- Builder
		- As a builder, I want to x so that I can y

# Design choices

Html, CSS, Javascript

| Pros                                                                                 | Cons                                                                               |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Only possible way I can develop for<br> a web specific application                   | I don't have experience attaching a database to this sort of implementation        |
| I have experience in working with this from personal projects and university classes | May reach performance bottlenecks with large maps and experience massive slowdowns |
| Usable across many different platforms                                               | Security is more difficult to assure when hosted on the web                        |
| Many additional tools that can be used to speed up the development process           | May be difficult to iterate on the project and add new features                    |
| Relative ease of creating a barebones usable prototype                               | Limited or no offline access is possible                                           |


Relational databases (MySQL specifically)

| Pros                                                                                                                            | Cons                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Structured data through the use of primary and foreign keys to intuitively link together all the different parts of the project | Less flexible than non-relational databases                                                                                         |
| Well known and reliable                                                                                                         | Scaling to handle more tasks/data than the original projections may be difficult, due to the rigid nature of the database structure |
| Can handle complex queries quickly and efficiently                                                                              | May not be the most efficient at retrieving and serving data as user scale increases                                                |
| Well documented                                                                                                                 | May require complex layers to manage the scope of the project                                                                       |
| I'm already somewhat familiar with these                                                                                        |                                                                                                                                     |
| Rigid structure reduces possible errors that may be more prevalent with non-relational databases                                |                                                                                                                                     |
Non-relational databases (Firebase specifically)

| Pros                                                                        | Cons                                                        |
| --------------------------------------------------------------------------- | ----------------------------------------------------------- |
| More flexible than relational databases                                     | Not nearly as consistent as relational                      |
| Scales well for handling large changes in data types and needs              | Limited support for complex querying of the database        |
| Handles unstructured data better                                            | More difficult to learn                                     |
| Handles large data operations better                                        | I don't have any starting knowledge of how to use this type |
| JSON document oriented storage                                              | May lead to data duping                                     |
| Can change how map or world data is structured without large schema changes | May lead to disorganization                                 |
|                                                                             |                                                             |
# Timeline

- **September 30 – October 13, 2024**
    
    - Creation of the basic system (map creation, location connections, entry organization).
- **October 14 – October 20, 2024**
    
    - Developer testing, initial user testing, and bug fixes.
- **October 21 – October 27, 2024**
    
    - Focus on user login experience and creation of explanatory tooltips.
- **October 28 – November 3, 2024**
    
    - Implementation of custom icons for locations and characters, and integration into the system.
- **November 4 – November 10, 2024**
    
    - Creation of light and dark mode, addressing any underdeveloped areas noted by users, sponsors, or the developer.
- **November 11 – November 24, 2024**
    
    - Final testing, refinement of features, and ensuring the application meets or exceeds expectations.