import React from 'react'
import { Text,View,StyleSheet,FlatList} from 'react-native'
import PropTypes from 'prop-types';
import DealItem from './DealItem';

export default class DealList extends React.Component {
    static propTypes={
        deals:PropTypes.array.isRequired,
        onItemPress:PropTypes.func.isRequired,
    }
  render() {
    return (
      <View style={styles.list}>
      <FlatList
      data={this.props.deals}
      renderItem={({item}) =><DealItem deal={item} onPress={this.props.onItemPress}/>}/>
      </View>
    )
  }
}

const styles=StyleSheet.create({
    list:{
        backgroundColor:'white',
        width:'100%',
        color:'black',
        
        
    }
})
