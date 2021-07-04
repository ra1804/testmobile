import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {getUsersSuccess, loadingStart} from '../store/actions';

const Item = ({user: {avatar, first_name, last_name, email}}) => (
  <View style={styles.item}>
    <Image
      style={styles.avatar}
      source={{
        uri: avatar,
      }}
    />
    <View>
      <Text style={styles.name}>{`${first_name} ${last_name}`}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  </View>
);

const Error = ({error}) => (
  <View>
    <Text style={styles.error}>{`Error: ${error}`}</Text>
  </View>
);

const Home = props => {
  const {users, loading, error} = props.usersState;

  useEffect(() => {
    if (!users.length) {
      props.loadingStart();
      setTimeout(() => props.getUsersSuccess(), 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => <Item user={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#a3e0ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
  },
  email: {
    fontSize: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  error: {
    padding: 20,
    fontSize: 20,
    color: '#e83a17',
  },
});

const mapStateToProps = state => ({
  usersState: state.users,
});

const mapDispatchToProps = dispatch => {
  return {
    loadingStart: () => dispatch(loadingStart()),
    getUsersSuccess: () => dispatch(getUsersSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
