import React from "react";
import throttle from "lodash/throttle";
import FilterBar from "./FilterBar"
const tabHeight = 50;

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


  return (
    <div>
      <div ref={catNav} className="custom-sticky-top category-container bottom-box-shadow" style={{backgroundColor: primaryColor}}>
        <p>Categories:</p>
        <nav className="categories-scroller"  value={activeState ? activeState : itemsServer[0].hash}>
              {itemsServer.map((item2) => (
                <div className="category-item" key={item2.hash} id={`category-nav-${item2.hash}`}
                  style={{
                    background:
                      activeState === item2.hash && "rgba(97, 133,71, 0.31)",
                    fontWeight: activeState === item2.hash && 500, fontSize: "14px"
                    // color: activeState === item2.hash && "white"
                  }}
                  label={item2.text}
                  onClick={handleClick(item2.hash)}
                  value={item2.hash}
                >{item2.text}</div>
              ))}
            
          </nav>
      </div>
      <FilterBar></FilterBar>
      {/* where the categories are built */}
      
        {itemsServer.map((item1) => (
          <section id={item1.hash} key={item1.text} >
              {item1.component}
          </section>
        ))}
      
    </div>
  );
}

export default ScrollSpyTabs;
