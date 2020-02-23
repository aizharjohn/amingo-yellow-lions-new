import React, { Fragment } from 'react';
import Navbar from './layout/Navbar';
import CardLayout from './CardLayout';
import Card from './Card';
import LoadFeedButton from './LoadFeedButton';


const FeedPage = () => {
 
    return (
      
      <div>

      <Navbar />
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Feeds</h1>
          <p className="lead text-muted">You must be logged in to view the feeds. Please click the button to load the feeds.</p>
        </div>
      </section>
    <center>
    <LoadFeedButton />
    </center>

      <CardLayout>
                <Card
                  image="https://cdn.pixabay.com/photo/2018/09/23/09/15/smoothie-3696961_960_720.jpg"
                  title="Diabetes"
                  description="Looking for help and support managing diabetes?"
                />
                <Card
                  image="https://cdn.pixabay.com/photo/2018/08/09/02/49/person-3593657_960_720.jpg"
                  title="Cardiology"
                  description="Find others with cardiology issues and support each other"
                />
                <Card
                  image="https://cdn.pixabay.com/photo/2018/08/13/03/21/woman-3602245_960_720.jpg"
                  title="Expecting Parents"
                  description="Meet other parents and attend workshops together"
                />
                <Card
                  image="https://images.unsplash.com/photo-1466193341027-56e68017ee2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  title="Cancer Support"
                  description="Find others who are going through and work together"
                />
                <Card
                  image="https://images.unsplash.com/photo-1555819206-7b30da4f1506?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                  title="Kidney Disease"
                  description="Find friends and attend dialysis sessions together"
                />
                <Card
                  image="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  title="Weight Management"
                  description="Need help in managing your weight, tips on diets?"
                />
              </CardLayout>
     

      </div>




    );
  };

export default FeedPage;