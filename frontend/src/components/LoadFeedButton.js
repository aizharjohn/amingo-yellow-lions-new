import React, { useState, useContext } from 'react';
//import AppContext from './AppContext';
import CardLayout from './CardLayout';
import Card from './Card.js';

const LoadFeedButton = () => {
  // global state
  //    const [globalState, setGlobalState] = useContext(
  //        AppContext
  //    );

  // local state
  const [state, setState] = useState({ feed: [] });

  const loadFeed = () => {
    // Fetch request goes
    fetch('http://localhost:5000/feed/all')
      .then(response => response.json())
      .then(json => {
        setState({
          ...state,
          feed: json.results
        });
      });
  };

  if (state.feed.length === 0) {
    return (
      <button className="btn btn-primary my-1" onClick={loadFeed}>
        Load Feed
      </button>
    );
  } else {
    return (
      <CardLayout>
        {state.feed.map(item => (
          <Card
            title={``}
            image={item.image}
            description={item.description}
            buttonLabel="View Post"
          />
        ))}
      </CardLayout>
    );
  }
};

export default LoadFeedButton;
