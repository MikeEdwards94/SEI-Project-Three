<h1>Project 3 - The Natural Wanderer</h1>

<h3>Project Overview:</h3>

For the third project at GA we were tasked with building a full stack MERN application in a group of three over the period of one week.

<h3>Deployment</h3>

The link for the deployed project can be found here: https://natural-wanderer.netlify.app/

<h3>Technologies Used</h3>

* React.js
* Node.js
* Express
* MongoDB/ Mongoose
* Axios
* React Mapbox GL
* SASS
* Semantic UI Framework
* Nodemon
* Bcrypt
* Body-parser
* JWT
* Git/ GitHub

__APIs Used__

* Mapbox
* Weather API

<h3>Planning Phase</h3>

After some brain-storming we quickly settled on a global National Park application, where users would be able to look up parks, get information and add it to a wishlist of sorts. First  we drew up a user flow chart using Miro, so we could all get a good grip on what pages were going to be required but also to structure a way for the user to easily navigate around the app. 

<img width="686" alt="Screenshot 2021-05-09 at 19 07 07" src="https://user-images.githubusercontent.com/77836499/117736719-325aa200-b1f0-11eb-8cf8-58a2b2573a77.png">


We then went onto build a basic wireframe for the design of some of the pages. Although none of us had a clear direction of colours, layout etc. at this stage, we wanted to have a base upon which to build on, so we could have some level of consistency from the start as we would end up working on different components. At this was the first full stack MERN app we had all undertaken we made a conscious effort to keep the scope of the project small, even though we had a lot of ideas for post-MVP, so we could have a solid end-product that we could keep building upon if we had the time.

**Homepage**

<img width="400" alt="Screenshot 2021-05-09 at 18 23 07" src="https://user-images.githubusercontent.com/77836499/117736733-38e91980-b1f0-11eb-8848-a04e18235250.png">

**Region Select**

<img width="400" alt="Screenshot 2021-05-09 at 18 23 29" src="https://user-images.githubusercontent.com/77836499/117736732-37b7ec80-b1f0-11eb-8473-0f1f67c5c822.png">

**Park Show page**

<img width="400" alt="Screenshot 2021-05-09 at 18 23 35" src="https://user-images.githubusercontent.com/77836499/117736724-34bcfc00-b1f0-11eb-9d03-4e290e22a63f.png">




From here we made a list of everything we thought each component would consist of and added them all down onto a google sheet. From here we could then derive what schemas we would require and what they would consist of.

<img width="1273" alt="Screenshot 2021-05-09 at 18 15 16" src="https://user-images.githubusercontent.com/77836499/117736749-469e9f00-b1f0-11eb-9ad9-953d2659a9de.png">


The last phase of our planning was to list any tasks on a Trello Board. This helped not only remind us of any outstanding issues, but organise who was doing what task, particularly over the weekend or when people were working at different times of day.

<img width="1193" alt="Screenshot 2021-05-09 at 18 18 15" src="https://user-images.githubusercontent.com/77836499/117736737-3b4b7380-b1f0-11eb-804b-d25f5bb29609.png">



<h3>Backend</h3>

We started on the backend first, with the aim to get this done within a few days ideally. To begin we created a function to handle our server below. We would later return to this function to add users, recommendations and comments. 

```
const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('Database has connected succesfully')

    // Clear the db
    await mongoose.connection.db.dropDatabase()
    console.log('DB dropped')
  
    // add parks to db
    const parks = await Park.create(parksWithUsers, parksWithComments, parksWithRecommendations)
    console.log('Parks >', parks)
    console.log(`DB seeded with ${parks.length} parks`)

    // close the connection
    await mongoose.connection.close()
    console.log('Bye')


  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
    console.log('Bye')
  }
}
seedDatabase()
```

Next we started building out the schemas we would be using for our models as well as some basic authentication for a user to be able to login and register. Then we moved onto adding in some Routes for us to be able to GET, UPDATE or DELETE from the database. First we built out the controller for the parks and then followed this up by building out a router to grab this function. A small part of this shown below:

```
const router = express.Router()

router.route('/parks')
  .get(getAllParks)

router.route('/parks/:id')
  .get(getOnePark)
  
  
// INDEX ROUTE
export const getAllParks = async (_req, res) => {
  const parks = await Park.find()
  return res.status(200).json(parks)
}

// SHOW ROUTE
export const getOnePark = async (req, res) => {
  try {
    const { id } = req.params
    const singlePark = await Park.findById(id).populate('comments.owner').populate('recommendations.owner')
    if (!singlePark) {
      throw new Error()
    }
    return res.status(200).json(singlePark)
  } catch (err) {
    console.log('Something went wrong!')
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}
```

After some extensive testing in Insomnia, we were able to all confirm that the requests were coming through okay. We managed to get the backend done by the third day, which left us a lot of time to work on the front-end.

<h3>Frontend</h3>

Over the next few days we all worked on different parts although we would sometimes swap around on the areas if we wanted to get some experience on a particular area or would work together if a component posed a challenge. One of the main areas of focus for me would be the park show page. Firstly we needed to pull in the data by making a GET request as seen below. This would then allow us manipulate all the park data to show blocks of info and images of the park. 

```
  useEffect(() =>{
    const getData = async () => {
      const { data } = await axios.get(`/api/parks/${params.id}`)
      setPark(data)
    }
    
    getData()
  }, [])
 ```

One of the features I worked most on is the implementation of MapBox within the ParkShow page. We had previously added in the latitude and longitude into the parkSchema so that we had a direct location for all the parks in the database. I then used these co-ordinates to set a viewport to center the map on, so the user would be looking specifically at the national park. I would also use these to add in a map marker for the national park when the use zoomed far out as the natural map marker for the national parks on MapBox would be lost when the user zoomed out a little too far. I also added in a `onViewportChange` to the JSX so when the user moved the map it would also update the map allowing them to explore.

```
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 10
  })

  const permaLat = latitude
  const permaLong = longitude
  
// JSX
  {viewport ?
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          height='400px'
          width='400px'
          mapStyle='mapbox://styles/mapbox/outdoors-v11'
          {...viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {viewport.zoom < 7 &&
          <Marker key={location.id} longitude={permaLong} latitude={permaLat}>
            📍{name}
          </Marker>
          }
        </ReactMapGL>
        :
        <h1>Loading your location...</h1>
      }
```
Expanding on the MapBox as part of a post-MVP feature both I and Jonty worked on implementing a secondary Mapbox which would allow users to plot a route. This would allow users to both create and update routes as they pleased. Ideally we would've liked to have kept expanding on this feature adding in more detail to palces to see, or ways to save or export routes for the user to keep, however as this was a late addition to the project we didn't have enough time to add much more.

I would also work on some of the forms in regards to leaving a comment, as well as the login/ register pages. Although it would be unlikely to occur we wanted to add in some error handling in case a user entered in thei details incorrectly. To do this we would catch any errors from the database when making a login or register request and commit this to state. From here we could create a condition which if contained errors would display an error message received from the backend, which required some minor tweaks to the schemas in the backend to do so. From here the error would display to the user telling them specifically which part of their registration was incorrect.

```
// State holding errors
  const [errors, setErrors] = useState({
    email: '',
    fullName: '',
    password: '',
    username: '',
    passwordConfirmation: ''
  })
  
// Function to handle registration submission
    const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/register', formData)
      window.localStorage.setItem('token', response.data.token)
      setTimeout(() => {
        history.push('/login')
      }, 3000)
      
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data.errors)
    }
  }
  
// JSX error returned to user in form
    { errors.username && <p className="help is-danger">{errors.username.message}</p> }
```

<h3>Division of Work</h3>

At the start of the day we would discuss what areas we needed completing next and from there would decide who would do what. All three of us were very easy-going as to what area we would like to work on, therefore we all got involved with both the front-end and back-end, but each built out different components. 

<h3>Styling</h3>

For this project we decided to use a framework none of us had used before in Semantic UI. This proved to be a bit more tricky than Bulma which we had all used before, but we all wanted to challenge ourselves to a new framework. Overall the design came out well, as we aimed to have a fairly clean and clear look to the website, which would be easy to navigate. It is also responsive, which was one of the early considerations that led us to using a framework as we were conscious of the timeframe to complete this project.


<h3>Challenges</h3>

One of the biggest challenges I experienced on this project was the addition of the mapbox with line plotting features. This was a later post-MVP addition that both Jonty and I worked on, which proved to be awkward to implement, however we did manage to get there by the end!

<h3>Wins</h3>

* Reached MVP with much faster than we thought we might, this allowed us to expand on some of our ideas and add more polish to the end product.
We worked very well as a group, all ideas and problems with code were discussed and worked on as a group meaning we were able to problem-solve a lot quicker and be consistent with the style of our end product.

* The app works, from finding the parks, to the adding of recommendations, to leaving comments.

<h3>Future Enhancements</h3>

* A search/ filter for the user to find a specific park
* Perhaps expand on mapbox - add in directions to destinations or mark locations of recommendations
* A spinner UI so users know if something is loading or not
* Choose park rating by clicking on stars opposed to typing in number

<h3>Key Learnings</h3>

**Organisation** - I felt like we did a fair amount of pre-code planning for this project which with hindsight helped enormously. Throughout the project we would be in a zoom call (sometimes with camera/ mic turned off) meaning if we needed to discuss anything we could just shout. This meant we were all on the same wavelength and had really good group harmony towards our end-goal.

**Backend** - This was the first big project with a backend that I did, initially this was a slightly daunting task, but after reading over some documentation and methodically working through the code, it really solidified my understanding of it.

**Clean Code** - Initially we kept the code quite clean, however towards the end of the project some of the components grew quite large. At that point in time, we as a three all understood the inner workings, but after taking a step back I can see there are parts which could’ve been cleaned up or split up, so it's easier to read. I think had we had a bit more time, we could’ve definitely achieved this, but the timeframe in which to build was quite limited!
