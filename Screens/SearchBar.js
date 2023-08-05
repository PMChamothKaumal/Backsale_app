import React from 'react'
import { Text, View, Button,StyleSheet,TextInput } from 'react-native'
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

export default class SearchBar extends React.Component {
  static propTypes={
    searchDeals:PropTypes.func.isRequired,
  };
  state={
    searchTerm:'',
  };
  searchDeals=(searchTerm)=>{
    this.props.searchDeals(searchTerm);
    this.inputElement.blur();
  }
  debouncedSearchDeals = debounce(this.props.searchDeals,300) 
  handleChange=(searchTerm)=>{
    this.setState({searchTerm}, ()=>{
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <TextInput
      ref={()=>{this.inputElement=this.inputElement}} 
      placeholder='Search All Deals' style={styles.input}
      onChangeText={this.handleChange}/>
    )
  }
}
 const styles =StyleSheet.create({
    input:{
        height:40,
        marginHorizontal:12,
    }
 })
