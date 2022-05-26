const HOST = 'http://localhost:8000/postmovie/'

const ACCOUNTS = 'accounts/'
const REVIEWS = 'reviews/'
const COMMENTS = 'comments/'
const MOVIES = 'movies/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profile: username => HOST + ACCOUNTS + 'profile/' + `${username}/`,
    follow: username => HOST + ACCOUNTS + 'follow/' + `${username}/`,
    wishList: moviePk => HOST + ACCOUNTS + 'wishlist/' + `${moviePk}/`,
  },
  reviews: {
    reviews: () => HOST + REVIEWS,
    reviewNew: moviePk => HOST + REVIEWS + 'create/' + `${moviePk}/`,
    review: reviewPk => HOST + REVIEWS + `${reviewPk}/`,
    likeReview: reviewPk => HOST + REVIEWS + `${reviewPk}/` + 'like/',
    comments: reviewPk => HOST + REVIEWS + `${reviewPk}/` + COMMENTS,
    comment: (reviewPk, commentPk) => HOST + REVIEWS + `${reviewPk}/` + COMMENTS + `${commentPk}/`,
  },
  movies: {
    movies: () => HOST + MOVIES,
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    recommend: moviePk => HOST + MOVIES + `${moviePk}/` + 'recommend/'
  },
}
