import React from "react";
import { Tabs, Tab, Row, Col, Image } from "react-bootstrap";
import throttle from "lodash/throttle";
import classnames from "classnames";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

const tabHeight = 50;
// const StyledTabs = withStyles({
//   indicator: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     "& > div": {
//       maxWidth: 30,
//       width: "100%",
//       backgroundColor: "#635ee7"
//     }
//   }
// })(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

// const StyledTab = withStyles(theme => ({
//   root: {
//     textTransform: "none",
//     height: tabHeight,
//     fontWeight: theme.typography.fontWeightRegular,
//     fontSize: theme.typography.pxToRem(15),
//     marginRight: theme.spacing(1),
//     "&:focus": {
//       opacity: 1
//     }
//   }
// }))(props => <Tab disableRipple {...props} />);

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   indicator: {
//     padding: theme.spacing(1)
//   },
//   demo2: {
//     backgroundColor: "#fff",
//     position: "sticky",
//     top: 0,
//     left: 0,
//     right: 0,
//     width: "100%"
//   }
// }));

/******* This is the scroll spy magic */
/*
Credits: Material UI
Source:
https://github.com/mui-org/material-ui/blob/404c2ba16816f5c7ab7d8b2caf6bbc3d2218b820/docs/src/modules/utils/textToHash.js
*/
const makeUnique = (hash, unique, i = 1) => {
  const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

  if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUnique(hash, unique, i + 1);
};

const textToHash = (text, unique = {}) => {
  return makeUnique(
    encodeURI(
      text
        .toLowerCase()
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, "")
        // eslint-disable-next-line no-useless-escape
        .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    ),
    unique
  );
};
const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) return undefined;

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

function ScrollSpyTabs(props) {
  const [activeState, setActiveState] = React.useState(null);
  const { tabsInScroll, primaryColor, catNav, showDropShadow } = props;

  let itemsServer = tabsInScroll.map((tab) => {
    const hash = textToHash(tab.text);
    return {
      icon: tab.icon || "",
      text: tab.text,
      component: tab.component,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const setNextActiveIndex = (forward) => {
    const currentActiveStateIndex = itemsServer.findIndex(
      (item) => item.hash === activeState
    );
    if (forward) {
      if (
        currentActiveStateIndex !== -1 &&
        currentActiveStateIndex < itemsServer.length - 1
      ) {
        disableAutoDetect();
        setActiveStateAndScroll(itemsServer[currentActiveStateIndex + 1].hash);
      }
    } else {
      if (currentActiveStateIndex !== -1 && currentActiveStateIndex > 0) {
        disableAutoDetect();
        setActiveStateAndScroll(itemsServer[currentActiveStateIndex - 1].hash);
      }
    }
  };
  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8 +
            tabHeight
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
      snapCategoryNav(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);
  const snapCategoryNav = (hash) => {
    const offset = document.getElementById(`category-nav-${hash}`).offsetLeft;
    const gutterLeftWidth = document.getElementById(
      "category-nav-gutter-left"
    ).offsetWidth;
    const colEl = document.getElementById("category-nav-bar-col");

    const paddingLeftWidth = parseFloat(
      window.getComputedStyle(colEl, null).getPropertyValue("padding-left")
    );

    document.getElementById(`category-nav-bar`).scrollTo({
      left: offset - gutterLeftWidth - paddingLeftWidth,
      behavior: "auto",
    });
  };
  const disableAutoDetect = () => {
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);
  };
  const setActiveStateAndScroll = (hash) => {
    setActiveState(hash);

    if (window) {
      const scrollDiff =
        document.getElementById(hash).getBoundingClientRect().top +
        window.pageYOffset;
      window.scrollTo({
        top: scrollDiff - 50,
        behavior: "smooth",
      });

      snapCategoryNav(hash);
    }
  };
  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    disableAutoDetect();

    if (activeState !== hash) {
      setActiveStateAndScroll(hash);
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );
  const shouldShowNavButton = (forward) => {
    const idx = itemsServer.findIndex((item) => item.hash === activeState);
    if (forward) {
      return idx !== -1 && idx !== itemsServer.length - 1;
    } else {
      return idx !== -1 && idx !== 0;
    }
  };

  // const classes = useStyles();

  return (
    <div>
      <Row
        ref={catNav}
        className="custom-sticky-top"
        style={{
          borderBottom: showDropShadow && "2px solid lightgray",
          // boxShadow: showDropShadow && "0 2px 4px 0 rgb(0 0 0 / 12%)",
        }}
      >
        <Col
          xs={1}
          className="custom-sticky-top d-flex justify-content-end align-items-center "
          id="category-nav-gutter-left"
        >
          {shouldShowNavButton(false) && (
            <Image
              className="category-back-button"
              onClick={() => setNextActiveIndex(false)}
              src={"/img/back-arrow.png"}
              style={{ position: "relative", left: "calc(1rem - 1vw)" }}
            />
          )}
        </Col>
        <Col xs={10} id="category-nav-bar-col">
          <nav
            className="d-flex category-nav noscroll"
            id="category-nav-bar"

            // style={{
            //   backgroundColor: "#fff",
            //   position: "sticky",
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   zIndex: 1024,
            //   width: "100%",
            // }}
          >
            <div
              value={activeState ? activeState : itemsServer[0].hash}
              className="d-flex align-items-center"
              style={{ height: 50 }}

              // style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   backgroundColor: "transparent",
              //   "& > div": {
              //     maxWidth: 30,
              //     width: "100%",
              //     backgroundColor: "#635ee7",
              //   },
              // }}
            >
              {itemsServer.map((item2) => (
                <div
                  key={item2.hash}
                  id={`category-nav-${item2.hash}`}
                  className="half-sized-border"
                  style={{
                    textTransform: "none",
                    cursor: "pointer",
                    borderBottom:
                      activeState === item2.hash && `2px solid ${primaryColor}`,
                    height: "fit-content",
                    flexGrow: 1,
                    fontWeight: activeState === item2.hash && 500,
                    marginRight: "1rem",
                    whiteSpace: "nowrap",
                    "&:focus": {
                      opacity: 1,
                    },
                  }}
                  label={item2.text}
                  onClick={handleClick(item2.hash)}
                  value={item2.hash}
                >
                  {item2.text}
                </div>
              ))}
            </div>
            {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",

            maxWidth: 30,
            width: "100%",
            backgroundColor: "#635ee7",

            padding: "1rem",
          }}
        /> */}
          </nav>
        </Col>
        <Col
          xs={1}
          className="custom-sticky-top d-flex justify-content-start align-items-center "
        >
          {shouldShowNavButton(true) && (
            <Image
              className="category-back-button rotateimg180 "
              onClick={() => setNextActiveIndex(true)}
              src={"/img/back-arrow.png"}
              style={{ position: "relative", right: "calc(1rem - 1vw)" }}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={1} />
        <Col xs={10}>
          <div className="container p-0">
            {itemsServer.map((item1) => (
              <article id={item1.hash} key={item1.text}>
                {item1.component}
              </article>
            ))}
          </div>
        </Col>
        <Col xs={1} />
      </Row>
    </div>
  );
}

export default ScrollSpyTabs;
