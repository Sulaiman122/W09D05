# W09D05

### Heroku deployment: [http://w09d05.herokuapp.com/](http://w09d05.herokuapp.com/)
 - didn't work properly in heroku since I used passport sessions to authenticate users, for some reason in heroku doesn't set cookies in session for security purposes.
 though, It work 100% fine locally.
 
## Description

**_Blog website_** is a website allow registered user to create their own post, also allow the user to change the post or delete it.
and admin has his own page to see all users post plus his own post and delete whatever he wants and he can also see all users and delete them if he wants.
and he can make comments, like, or unlike, or delete comment or edit comment, or delete a post.

## UML diagram
<img src='https://i.ibb.co/DpPx8Cq/Untitled-Diagram-drawio-2.png' alt='img'/>

## User Stories

- **Register:** As a visitor I can register in the website so that I can create my own post list
- **Login:** As a user I can login to in the website so that I can create my own post list
- **Logout:** As a user I can logout from the website so no one else can use it
- **Add post** As a user I can add an task to my post list
- **delete post** As a user I can delete one of my post
- **detele comment** As an admin I can see all users post then i can delete any one of them
- **Like / unlike ** As an a I user i can give like or unlike a post

# Client / Frontend

## React Router Routes (React App)

| Path        | Component | Permissions                 | Behavior                                                             |
| ----------- | --------- | --------------------------- | -------------------------------------------------------------------- |
| `/`         | n/a       | public `<Route>`            | Home page                                                            |
| `/register` | Register  | anon only `<AnonRoute>`     | Register form, link to login, navigate to log in page after register |
| `/login`    | Login     | anon only `<AnonRoute>`     | Login form, link to register, navigate to homepage after login       |
| `/post`    | All posts     | user only `<PrivateRoute>`  | Shows user post list                                                 |
| `/post/:id` | single post  | admin only `<PrivateRoute>` | Shows other users post                                          |

## Components

- Home
- Admin
- Login
- Sign up
- post

## Reducers

- Account Reducer
- login(user, role, token)
- logout()
- Tasks Resucer
- set(post)



## Packages Used

- axios
- react-router-dom
- dotenv
- react-redux
- redux
- redux-devtools-extension



## GitHub Link

[repository Link](https://github.com/sulaiman122/w09d05)
