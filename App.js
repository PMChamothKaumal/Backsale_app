//rnfe
import { Text, View, Button,StyleSheet,Animated,Easing,Dimensions } from 'react-native'
import React from 'react'
import ajax from './Screens/ajax';
import DealList from './Screens/DealList';
import DealDetail from './Screens/DealDetail';
import SearchBar from './Screens/SearchBar';




export default class App extends React.Component {

  titleXPos=new Animated.Value(0);
  state={
    deals:[],
    dealsFormSearch:[],
    currentDealId:null,

  };
  animateTitle=(direction=1)=>{
    const width=Dimensions.get('window').width-150;
    Animated.timing(
      this.titleXPos,{toValue:direction*(width/2), duration:1000,
      easing:Easing.linear}
    ).start(({finished})=>{
      if(finished){
      this.animateTitle(-1 *direction);}});
  
  };

    async componentDidMount(){
    
      const deals = await ajax.fetchInitialDeals();
      this.setState({deals});
    };
    searchDeals= async(searchTerm)=>{
      let dealsFormSearch=[];
      if(searchTerm){
        dealsFormSearch=await ajax.fetchDealsSearchResults(searchTerm);
      }
      this.setState({dealsFormSearch});
    };
    setCurrentDeal=(dealId)=>{
      this.setState({
        currentDealId:dealId
      });
    };
    unsetCurrentDeal=()=>{
      this.setState({
        currentDealId:null,
      });
    };
    currentDeal=()=>{
      return this.state.deals.find(
        (deal)=>deal.key===this.state.currentDealId
      );
    }
    render(){
      if(this.state.currentDealId){
        return (
        <View style={styles.main}>
        <DealDetail initialDealData={this.currentDeal()}
        onBack={this.unsetCurrentDeal}/>
        </View>
        );
      }
      const dealsToDisplay=
      this.state.dealsFormSearch.length>0
      ? this.state.dealsFormSearch
      : this.state.deals

      if(dealsToDisplay.length>0){
        return(
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals}/>
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}/>
        </View>
        );
      }
    return(
    <Animated.View style={[{left:this.titleXPos}, styles.container]}>
        <Text style={styles.header}>Back_Sale</Text>
    </Animated.View>
    );
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:'center',
    alignItems:'center', 
    color:'black'
  },
  main:{
    marginTop:30,
  },
  header:{
    fontSize:40,
    color:'black'
  }
})


