
import { useState, useEffect } from 'react';
import { Person } from '@mui/icons-material';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMoneyBillWave, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { LinkedIn, Twitter, Phone, Email } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';



function App() {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [open, setOpen] = useState(false);

  //make it a  different hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('https://dev-api.konfhub.com/event/public/konfhub-frontend-evaluation-task');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  //different hook
  // Countdown calculation
  useEffect(() => {
    const targetDate = new Date('2024-07-31T00:00:00Z');

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        setCountdown('Countdown Ended');
        return;
      }

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown(`${days}D : ${hours}H : ${minutes}M : ${seconds}S`);
    };

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  // Navigate to event website
  const navigateToEventWebsite = () => {
    window.location.href = data.event_website;
  };

  // drawer
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handleDrawer in the parameter pass true or false and that parameter should be set in state



  return (
    <div className="App">
      {data ? (
        <div>
          {/* logo */}
          <div>
            {data.navbar_icon && (
              <img src={data.navbar_icon} alt="Navbar Icon" className="navbar-icon" />
            )}
            {/* profile icon */}
            <a href="https://dev-accounts.konfhub.com/login" target="_blank" rel="noopener noreferrer">
              <Person fontSize="large" className="icon" />
            </a>
          </div>

          {/* hello image */}
          <div>
            {data.event_poster_url && (
              <img src={data.event_poster_url} alt="Event Poster" className='poster-img' />
            )}
          </div>
          {/* NavBar */}

{/* tab implementaion */}
          <div class="navbar">
            <ul class="nav-links">
              <li class="nav-item"><a href="#about">About</a></li>
              <li class="nav-item"><a href="#tickets">Tickets</a></li>
              <li class="nav-item"><a href="#speaker">This is speakers section</a></li>
              <li class="nav-item"> <a href="#workshops">This is workshop section</a></li>
              <li class="nav-item"><a href="#sponsors">This is event sponsors</a></li>
            </ul>
          </div>

          {/* event details */}
          <div className="info-box">
            <h1 className='event-details-title'>KonfHub Frontend Evaluation Task</h1>
            <div className="event-icons">
              <div className="event-icon">
                <FontAwesomeIcon icon={faVideo} /> Online
              </div>
              <div className="event-icon">
                <FontAwesomeIcon icon={faMoneyBillWave} /> Paid
              </div>
            </div>
            <div className="event-details">
              <p>
                <span className='event-subhead' >Event Live Link:</span>  <a href={data.event_website} target="_blank" rel="noopener noreferrer">Open streaming website</a>
              </p>
              <p>
                <span className='event-subhead'>Date: </span>Jul 31st, 2034 6:00 AM - Aug 31st, 2034 6:00 PM IST
              </p>
              <p>
                EVENT STARTS IN <br></br>
                <span className="event-countdown">{countdown}</span>
              </p>
            </div>
          </div>
          <div>
            <button className="info-box-buy-btn">Buy Now</button>
          </div>
          <div>
            <button className="info-box-btn" onClick={navigateToEventWebsite}>Official Website <FontAwesomeIcon icon={faExternalLinkAlt} /></button>
          </div>


          {/* about description */}
          <section id="about">
            <h2>ABOUT EVENT</h2>
            <div className="description-container" dangerouslySetInnerHTML={{ __html: data.description }} />
          </section>
          {/* speaker-section */}
          <section id="speaker">
            <div className='speaker_section_title' dangerouslySetInnerHTML={{ __html: data.speaker_section_title }} />
            <div className='speaker_section_description' dangerouslySetInnerHTML={{ __html: data.speaker_section_description }} />
            <div className="profile-container">
              <div className="profile-box">
                <img
                  src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977337424-66d3d266-64c3-4c45-a4ec-f9288d96dbc8.jpg"
                  alt="Profile 1"
                  className="profile-image"
                  onClick={handleClick} />
                <h2 className="profile-name" onClick={handleClick}>Bruce Wayne</h2>
                <p className="profile-designation" onClick={handleClick}>Chairman</p>
                <p className="profile-company" onClick={handleClick}>Wayne Enterprises</p>
                <div className="profile-links">

                  {data.organizer_facebook_url && (
                    <a href={data.organizer_facebook_url} target="_blank" >
                      <FacebookIcon className='organizer-icon' />
                    </a>
                  )}
                  {data.organizer_twitter_url && (
                    <a href={data.organizer_twitter_url} target="_blank" >
                      <Twitter className='organizer-icon' />
                    </a>
                  )}
                  {data.organizer_linkedin_url && (
                    <a href={data.organizer_linkedin_url} target="_blank" >
                      <LinkedIn className='organizer-icon' />
                    </a>
                  )} {data.organiser_website && (
                    <p>
                      <a href={data.organiser_website} target="_blank" >
                        <LanguageIcon />
                      </a>
                    </p>
                  )}
                </div>
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={handleClose}
                >
                  <div>
                    <IconButton onClick={handleClose} className='drawer-close-btn' >
                      <CloseIcon />
                    </IconButton>
                    <img
                      src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977337424-66d3d266-64c3-4c45-a4ec-f9288d96dbc8.jpg"
                      alt="Profile 2"
                      className="drawer-profile-image"
                    />
                    <h2 className="drawer-profile-name">Bruce Wayne</h2>
                    <p className="drawer-profile-designation">Chairman</p>
                    <p className="drawer-profile-designation">Wayne Enterprises</p>
                    <div className="profile-links">

                      {data.organizer_facebook_url && (
                        <a href={data.organizer_facebook_url} target="_blank" >
                          <FacebookIcon className='organizer-icon' />
                        </a>
                      )}
                      {data.organizer_twitter_url && (
                        <a href={data.organizer_twitter_url} target="_blank" >
                          <Twitter className='organizer-icon' />
                        </a>
                      )}
                      {data.organizer_linkedin_url && (
                        <a href={data.organizer_linkedin_url} target="_blank" >
                          <LinkedIn className='organizer-icon' />
                        </a>
                      )} {data.organiser_website && (
                        <p>
                          <a href={data.organiser_website} target="_blank" >
                            <LanguageIcon />
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </Drawer>
              </div>

              <div className="profile-box">
                <img src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977466945-9da4f3da-047e-491b-83c3-6c2adc46223b.jpg"
                  alt="Profile 2"
                  className="profile-image"
                  onClick={handleClick} />
                <h2 className="profile-name" onClick={handleClick}>Dark Knight</h2>
                <p className="profile-designation" onClick={handleClick}>Batman</p>
                <p className="profile-company" onClick={handleClick}>Gotham</p>
                <div className="profile-links">
                  {data.organizer_facebook_url && (
                    <a href={data.organizer_facebook_url} target="_blank" >
                      <FacebookIcon className='organizer-icon' />
                    </a>
                  )}
                  {data.organizer_twitter_url && (
                    <a href={data.organizer_twitter_url} target="_blank" >
                      <Twitter className='organizer-icon' />
                    </a>
                  )}
                  {data.organizer_linkedin_url && (
                    <a href={data.organizer_linkedin_url} target="_blank" >
                      <LinkedIn className='organizer-icon' />
                    </a>
                  )} {data.organiser_website && (
                    <p>
                      <a href={data.organiser_website} target="_blank" rel="noopener noreferrer">
                        <LanguageIcon />
                      </a>
                    </p>
                  )}

                </div>
              </div>
              <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
              >
                <div>
                  <IconButton onClick={handleClose} className='drawer-close-btn' >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977466945-9da4f3da-047e-491b-83c3-6c2adc46223b.jpg"
                    alt="Profile 2"
                    className="drawer-profile-image"
                  />
                  <h2 className="drawer-profile-name">Dark Knight</h2>
                  <p className="drawer-profile-designation">Batman</p>
                  <p className="drawer-profile-designation">Gotham</p>
                  <div className="profile-links">

                    {data.organizer_facebook_url && (


                      <a href={data.organizer_facebook_url} target="_blank" >
                        <FacebookIcon className='organizer-icon' />
                      </a>
                    )}
                    {data.organizer_twitter_url && (
                      <a href={data.organizer_twitter_url} target="_blank" >
                        <Twitter className='organizer-icon' />
                      </a>
                    )}
                    {data.organizer_linkedin_url && (
                      <a href={data.organizer_linkedin_url} target="_blank" >
                        <LinkedIn className='organizer-icon' />
                      </a>
                    )} {data.organiser_website && (
                      <p>
                        <a href={data.organiser_website} target="_blank" >
                          <LanguageIcon />
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </Drawer>
            </div>
          </section>
        {/* single drawer */}

          {/* workshop */}
          <section id="workshops">
            <div className='workshop_title' dangerouslySetInnerHTML={{ __html: data.workshop_section_title }} />
            <div className='workshop_description' dangerouslySetInnerHTML={{ __html: data.workshop_section_description }} />

            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item xs={12} sm={12} md={4} lg={2.8}>
                <Card className="card">
                  <img
                    src="https://dev.konfhub.com/_next/image?url=https%3A%2F%2Fdev-media.konfhub.com%2Fsponsors%2F2024%2FJune%2F10%2F1717977949758-0e87f502-f5b9-4799-b857-623780fc1415.png&w=1920&q=75"
                    alt="square"
                    className="card-image"
                  />
                  <CardContent className="card-content">
                    <Typography variant="h6" component="div" className='workshop-name'>
                      How to make more money
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="card-date">
                      <CalendarTodayIcon className="calendar-icon" />
                      Jun 1st, 2034 at 10:00 AM (IST)
                    </Typography>
                  </CardContent>
                  <div className="footer">
                    <img
                      src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977337424-66d3d266-64c3-4c45-a4ec-f9288d96dbc8.jpg"
                      alt="circular"
                      className="circular-image"
                    />
                    <Button variant="contained" color="primary" className="workshop-button">
                      View Details
                    </Button>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={2.8}>
                <Card className="card">
                  <img
                    src="https://dev.konfhub.com/_next/image?url=https%3A%2F%2Fdev-media.konfhub.com%2Fsponsors%2F2024%2FJune%2F10%2F1717978156489-c8a828a9-13ca-4572-b117-0483bafd34d9.jpg&w=1920&q=75"
                    alt="square"
                    className="card-image"
                  />
                  <CardContent className="card-content">
                    <Typography variant="h6" component="div" className='workshop-name'>
                      How to fight crime
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="card-date-01">
                      <CalendarTodayIcon className="calendar-icon" />
                      Jun 1st, 2034 at 10:00 AM (IST)
                    </Typography>
                  </CardContent>
                  <div className="footer">
                    <img
                      src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977466945-9da4f3da-047e-491b-83c3-6c2adc46223b.jpg"
                      alt="circular"
                      className="circular-image"
                    />
                    <Button variant="contained" color="primary" className="workshop-button">
                      View Details
                    </Button>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={2.8}>
                <Card className="card">
                  <img
                    src="https://dev.konfhub.com/_next/image?url=https%3A%2F%2Fdev-media.konfhub.com%2Fsponsors%2F2024%2FJune%2F10%2F1717978363785-8225249d-f4dd-4572-826e-84093b5eb32f.jpg&w=1920&q=75"
                    alt="square"
                    className="card-image"
                  />
                  <CardContent className="card-content">
                    <Typography variant="h6" component="div" className='workshop-name'>
                      This is a workshop connected to a ticket
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="card-date">
                      <CalendarTodayIcon className="calendar-icon" />
                      Jun 1st, 2034 at 10:00 AM (IST)
                    </Typography>
                  </CardContent>
                  <div className="footer">
                    <div className="overlapping-images">
                      <img
                        src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977337424-66d3d266-64c3-4c45-a4ec-f9288d96dbc8.jpg"
                        alt="base"
                        className="base-image"
                      />
                      <img
                        src="https://dev-media.konfhub.com/speakers/2024/June/09/1717977466945-9da4f3da-047e-491b-83c3-6c2adc46223b.jpg"
                        alt="overlay"
                        className="overlapping-image"
                      />
                    </div>
                    <Button variant="contained" color="primary" className="workshop-button">
                      View Details
                    </Button>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </section>


          {/* sponser */}
          <section id="sponsors">
          <div className='sponsors_title' dangerouslySetInnerHTML={{ __html: data.sponsor_section_title }} />
          <div className='sponsors_description' dangerouslySetInnerHTML={{ __html: data.sponsor_section_description }} />

          <img
          src="https://dev.konfhub.com/_next/image?url=https%3A%2F%2Fdev-media.konfhub.com%2Fsponsors%2F2024%2FJune%2F09%2F1717977584480-2a58c92e-ac5f-4ebd-9570-d6bcfc792dc2.png&w=1920&q=75"
          className='sponser-img'
          />

          <h1>SPONSOR CATEGORY</h1>
          <img 
          src="https://dev-media.konfhub.com/sponsors/2024/June/10/1717977635909-75bb1d01-51a2-4af1-82cd-72d587192692.jpg"
          className='sponser-img2'
          />
          </section>


          {/* organizer details */}
          <p className='hosted'>HOSTED BY</p>
          <div className="organizer-box">
            <div className="organizer-image">
              {data.organiser_image_url && (
                <img src={data.organiser_image_url} alt="Organizer" className="organizer-img" />
              )}
              <h2>{data.organiser_name}</h2>
            </div>
            <div className="organizer-info">
              <p>{data.organiser_info}</p>
              <p className='contact-us'>Contact Us On</p>
              <div className="social-links">
                {data.organiser_website && (
                  <p>
                    <a href={data.organiser_website} target="_blank" rel="noopener noreferrer">
                      <LanguageIcon />
                    </a>
                  </p>
                )}
                {data.organiser_phone && (
                  <p>
                    <a href={`tel:${data.organiser_phone}`}>
                      <Phone />
                    </a>

                  </p>
                )}
                {data.organiser_email && (
                  <p>
                    <a href={`mailto:${data.organiser_email}`}>
                      <Email />
                    </a>
                  </p>
                )}
                {data.organizer_facebook_url && (
                  <a href={data.organizer_facebook_url} target="_blank" >
                    <FacebookIcon className='organizer-icon' />
                  </a>
                )}
                {data.organizer_twitter_url && (
                  <a href={data.organizer_twitter_url} target="_blank" >
                    <Twitter className='organizer-icon' />
                  </a>
                )}
                {data.organizer_linkedin_url && (
                  <a href={data.organizer_linkedin_url} target="_blank" >
                    <LinkedIn className='organizer-icon' />
                  </a>
                )}

              </div>
            </div>
          </div>



        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;





