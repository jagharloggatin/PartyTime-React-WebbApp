import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import LinkTab from './LinkTab';

export default function ProfileTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <LinkTab value="1" icon={<PersonPinIcon />} label="Activity page" to="/profile" />
            <LinkTab value="2" icon={<FavoriteIcon />} label="AppGetReviews" to="/profile/favorites" />
            <LinkTab value="3" icon={<CommentIcon />} label="Comments" to="/profile/comments" />
            <LinkTab value="4" icon={<ReviewsIcon />} label="Reviews" to="/profile/review" />
          </TabList>
        </Box>
        <Outlet></Outlet>
      </TabContext>
    </Box>
  );
}
