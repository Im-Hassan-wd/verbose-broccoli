import { Link } from "react-router-dom";
import Analytic from "../../img/analytics.svg";
import Social from "../../img/social.svg";
import Content from "../../img/content.svg";

// styles
import "./Landing.css";

// components
import Card from "./components/Card";

const cardContents = [
  {
    image: Analytic,
    title: "Analytics",
    body: "Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time",
  },
  {
    image: Social,
    title: "Social interactions",
    body: "Users on the platform can interact with posts they like, comment and engage in discussions",
  },
  {
    image: Content,
    title: "Content creation",
    body: "Write nice and appealing with our in-built markdown, a rich text editor",
  },
];
export default function Landing() {
  return (
    <div className="landing">
      <nav>
        <div className="logo">
          <i className="fi fi-sr-comment-quote"></i>
          <span>Chatter</span>
        </div>
        <ul>
          <li>
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#">About us</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="/login">Blogs</Link>
          </li>
        </ul>
        <div className="btns">
          <Link className="btn btn-login" to="/login">
            Log in
          </Link>
          <Link className="btn" to="/signup">
            Sign up
          </Link>
        </div>
      </nav>

      <section id="hero">
        <div>
          <img src="./img/hero.png" alt="welcome message" />
          <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
          <button className="btn">Get started</button>
        </div>
      </section>

      <section id="about">
        <div className="">
          <h2>About Chatter</h2>
          <p>
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive{" "}
          </p>
        </div>
        <img src="./img/about.png" alt="about illustration" />
      </section>

      <section id="join">
        <h2>Why you should join chatter</h2>
        <p>
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
        <ul className="cards">
          {cardContents.map((c) => (
            <Card key={c.title} title={c.title} body={c.body} image={c.image} />
          ))}
        </ul>
      </section>

      <section id="review">
        <div className="container">
          <img src="./img/review.png" alt="review preview" />
          <div className="content">
            <p>
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”
            </p>
            <h4>Adebobola Muhydeen,</h4>
            <span>Software developer at Apple</span>
            <Link to="/signup" className="btn">
              Join chatter
            </Link>
          </div>
        </div>
      </section>

      <section id="connect">
        <div className="images">
          <img src="./img/user-1.png" alt="user" />
          <img src="./img/user-2.png" alt="user" />
          <img src="./img/user-3.png" alt="user" />
        </div>
        <div className="">
          <h2>Write, read and connect with great minds on chatter</h2>
          <p>
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals{" "}
          </p>
          <Link to="/posts" className="btn">
            Get started
          </Link>
        </div>
      </section>

      <footer>
        <div className="logo">
          <i className="fi fi-sr-comment-quote"></i>
          <span>Chatter</span>
        </div>

        <ul className="explore">
          <h5>Explore</h5>
          <li>community</li>
          <li>Trending blogs</li>
          <li>Chatter for teams</li>
        </ul>

        <ul className="support">
          <h5>Support</h5>
          <li>Support docs</li>
          <li>Join slack</li>
          <li>Contact</li>
        </ul>

        <ul className="blog">
          <h5>Official blog</h5>
          <li>Community blog</li>
          <li>Engineering blog</li>
        </ul>
      </footer>
    </div>
  );
}
