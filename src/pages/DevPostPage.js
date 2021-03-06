import React from "react";
import { useParams } from "react-router-dom";
import { BLOCKS } from "@contentful/rich-text-types";
import { connect } from "react-redux";
import { getPosts } from "../state/selectors";
import { readableDate } from "../components/helpers";

// import components
import {
  MainHeader,
  LikeButton,
  Footer,
  Loading,
  CommentArea,
  ScrollToTopOnMount,
  MarkDownBody,
} from "../components";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";

// Syntax higlighter highlights syntax for code blocks
import markdownHeadings from "markdown-headings";

/**
 * One can create a custom component for each element in the content block.
 * Reference: https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
 * @param {*} param0
 */
const PostImage = ({ alt, url }) => (
  <div className="postImage">
    <img className="image" src={url} alt={alt}></img>
  </div>
);

const Side = styled.div`
  vertical-align: top;
  width: 20%;
  display: inline-block;
  margin-top: 2%;
  @media only screen and (max-width: 1200px) {
    width: 15%;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-top: 25%;
`;
const Stats = styled.div`
  vertical-align: top;
  width: 20%;
  display: inline-block;
  margin-top: 2%;
  position: -webkit-sticky;
  position: sticky;
  top: 25vh;
  ${"" /* TODO: Add responsiveness here */}

  @media only screen and (max-width: 1200px) {
    padding-top: 0;
    width: 100%;
    position: relative;
    margin: 0;
  }
`;
const Body = styled.div`
  width: 60%;
  display: inline-block;
  @media only screen and (max-width: 1200px) {
    width: 70%;
  }
  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`;
const Date = styled.small`
  display: none;
  @media only screen and (max-width: 900px) {
    display: inline-block;
    font-size: 50%;
  }
`;
const Title = styled.h1`
  font-size: 500%;
  padding-top: 2.5;
  @media only screen and (max-width: 1200px) {
    font-size: 400%;
  }
  @media only screen and (max-width: 900px) {
    font-size: 200%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 150%;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const Content = styled.div`
  @media only screen and (max-width: 900px) {
    font-size: 100%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 75%;
  }
`;
const Aside = styled.aside`
  font-size: 14pt;
  border-left: 2px solid var(--aside-border);
  background-color: var(--aside-bg);
  padding: 1%;
  margin-bottom: 1%;
  @media only screen and (max-width: 600px) {
    font-size: 12pt;
  }
`;
const Hr = styled.hr`
  display: block;
  width: 70%;
  float: left;
  border: none;
  height: 0.5px;
  display: block;
  /* Set the hr color */
  color: var(--hr); /* old IE */
  background-color: var(--hr-bg); /* Modern Browsers */
`;
const DevPostPage = ({ posts }) => {
  const { id } = useParams();

  /**
   * For rendering custom image element inside the block
   * TODO: This might be useful later
   */
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const title = node.data.target.fields.title;
        const url = "https:" + node.data.target.fields.file.url;
        return <PostImage alt={title} url={url} />;
      },
    },
  };
  async function getImage(image) {
    console.log(image);
    const result = await fetch(
      `http://localhost:4000/photo?link=https:${image}`
    );
    const imageData = await result.json();
    const base64Flag = "data:image/jpeg;base64,";
    const imageSource = base64Flag + imageData.image;
    return imageSource;
  }
  const renderPost = () => {
    if (!posts.postsLoaded) return <Loading />;
    const post = posts.posts.find((post) => post.slug === id);
    /**
     * Get a list of headings on the page
     */
    const headings = markdownHeadings(post.body);
    const showHeadings = () => {
      return headings.map((heading) => {
        const level = (heading.match(/#/g) || []).length;

        let text = heading.replace(/#/g, "").trim();
        const P = styled.p`
          margin-left: ${7.5 * level}px;
          font-size: 12pt;
        `;
        return (
          <HashLink smooth to={`#${text.trim().replace(/\s/g, "-")}`}>
            <P>{text}</P>
          </HashLink>
        );
      });
    };

    function displayPostBody() {
      return <MarkDownBody body={post.body} />;
    }
    return (
      <>
        <Side className={"headings"}>
          <small>{readableDate(post.date)}</small>
          <Hr />
          <p>Contents:</p>
          <span>{showHeadings()}</span>
        </Side>
        <Body>
          <Title> {post.title} </Title>
          <Date>{readableDate(post.date)}</Date>
          <Aside>{post.description}</Aside>
          <Image src={post.featuredImage}></Image>
          <Content className={"postBody"}>{displayPostBody()}</Content>
        </Body>
        <Stats className={"headings"}>
          <LikeButton slug={post.slug} />
        </Stats>
        <CommentArea slug={post.slug} />
      </>
    );
  };
  return (
    <div>
      <ScrollToTopOnMount />
      <MainHeader />
      {renderPost()}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
export default connect(mapStateToProps)(DevPostPage);
