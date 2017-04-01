# to-do-app
small app for listing to-do items and categories

##Installing
(From terminal)
1. Git clone https://github.com/milotiger/to-do-app.git
2. cd to-do-app
3. npm install
4. npm start
5. cd public
6. bower install
7. Navigate browser to 'localhost:8080'

##Using
1. Create Categories
2. Edit/Delete Categories
3. Create Todo Items
4. Edit/Delete Items

##Database Schema
###Categories
| Field        | Type          |
| ------------- |:-------------:|
| CategoryName      | String(unique) |
| CategoryDescription      | String(optional)      |
###Todo Items
| Field        | Type          |
| ------------- |:-------------:|
| ItemName      | String(unique) |
| ItemDescription      | String(optional)      |
| Category      | ObjectId(ref: Categories Collection)      |
| CreatedAt      | TimeStamp      |
| ModifiedAt      | TimeStamp      |