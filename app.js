
const express = require('express');             // Express module define
const bodyParser = require('body-parser');      // body Parser module define
const ejs = require('ejs');                     // EJS module define
const _ = require('lodash');                    // Lodash module define

const homeStatingContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with dese Al  page sum will uncover many web sites still in their infancy.';

const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum mauris id pharetra commodo. In efficitur vulputate porttitor. Nullam vitae viverra nibh. Mauris ut est augue. Nunc tincidunt elementum imperdiet. Etiam ut consectetur ante. Integer magna lorem, consectetur quis diam sit amet, sodales iaculis mauris. Vivamus rhoncus ligula sed hendrerit dapibus. Phasellus semper, ante sed ultrices volutpat, lectus nibh vulputate nisi, feugiat lobortis orci metus a do dui, id suscipit nunc condimentum eu. Nulla facilisi.';

const contactContent = 'Nullam interdum mattis felis eget pulvinar. Nam sagittis eget justo ac feugiat. Nam dapibus arcu vitae cursus varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ac quam ante. Nullam a pulvinar libero. Nunc ultricies arcu vitae enim consequat bibendum.';


const app = express();
app.set('view engine', 'ejs');                      // EJS module set
app.use(bodyParser.urlencoded({extended: true}));   // body Parser module for use set
app.use(express.static('public'));                  // Public folder use for project

let posts = [];

app.get('/', function (req, res) {
    res.render('home', {
        statingContent: homeStatingContent,
        posts: posts
    });
});

app.get('/about', function (req, res) {
    res.render('about', {aboutPage: aboutContent});
});

app.get('/contact', function (req, res) {
    res.render('contact', {contactPage: contactContent});
});

app.get('/compose', function (req, res) {
    res.render('compose');
});

// app.get('/post', function (req, res) {
//     res.render('post');
// })

app.post('/compose', function (req, res) {
    const post = {
        title : req.body.postTitle,
        content : req.body.postBody
    };
    posts.push(post);
    res.redirect('/');
});



app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });

});



// project Setup time request and response working testing
// app.get('/', function (req, res) {
//     res.send('hello world');
// });


// Server Port Working testing
app.listen(3000, function () {
    console.log('Server is started on port 3000.');
});