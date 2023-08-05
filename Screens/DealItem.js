import React from 'react'
import { Text,View,StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';


export default class DealItem extends React.Component {
    static propTypes ={
        deal:PropTypes.object.isRequired,
        onPress:PropTypes.func.isRequired,
    };
    handlePress=()=>{
       this.props.onPress(this.props.deal.key);
    }
  render() {
    const {deal}=this.props;
    return (
        <TouchableOpacity style={styles.deal} onPress={this.handlePress}>
            <Image source={{uri:this.props.deal.media[0]}} style={styles.image}/>
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>{deal.price}</Text>
                </View>
            </View>
        </TouchableOpacity>   
    )
  }
}
 const styles=StyleSheet.create({
    deal:{
        marginHorizontal:12,
    },
    image:{
        width:'100%',
        height:150,
        backgroundColor:'gray',
    },
    info:{
        padding:10,
        backgroundColor:'white',
        borderColor:'#bbb',
        borderWidth:1,
        borderTopWidth:0,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:5,
        color:'black',
    },
    footer:{
        flexDirection:'row',
    },
    cause:{
        flex:2,
        color:'black'
    },
    price:{
        flex:1,
        textAlign:'right',
        color:'black'
    }
 })