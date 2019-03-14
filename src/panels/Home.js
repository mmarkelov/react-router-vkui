import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Panel,
  ListItem,
  Button,
  Group,
  Div,
  Avatar,
  PanelHeader,
} from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
  <Panel id={id}>
    <PanelHeader>Example</PanelHeader>
    {fetchedUser && (
      <Group title="User Data Fetched with VK Connect">
        <ListItem
          before={
            fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} />
            ) : null
          }
          description={
            fetchedUser.city && fetchedUser.city.title
              ? fetchedUser.city.title
              : ''
          }
        >
          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </ListItem>
      </Group>
    )}

    <Group title="Navigation Example">
      <Div>
        <Link to="/test/" style={{ textDecoration: 'none' }}>
          <Button size="xl" level="2">
            Show me the Persik, please
          </Button>
        </Link>
      </Div>
    </Group>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
