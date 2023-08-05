import React from 'react'
import { Text,View,ScrollView,Button,StyleSheet,FlatList,Image,TouchableOpacity,PanResponder,Animated,Dimensions, Linking} from 'react-native'
import PropTypes from 'prop-types';
import ajax from './ajax';



export default class DealDetail extends React.Component {
    imageXPos= new Animated.Value(0);
    imagePanResponder=PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderMove:(evt, gs)=>{
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease:(evt, gs=>{
            this.width=Dimensions.get('window').width;
            if(Math.abs(gs.dx)<this.width*0.4){
                const direction=Math.sign(gs.dx)
                Animated.timing(this.imageXPos,{
                    toValue:-1*this.width,
                    duration:250,
                }).start(()=>this.handleSwipe(-1*direction));
            }else{
                Animated.spring(this.imageXPos,{
                    toValue:0,
                }).start();
            }
        })
    });
    handleSwipe=(indexDirection)=>{
        if(this.state.deal.media[this.state.imageindex+indexDirection]){
            Animated.spring(this.imageXPos,{
                toValue:0,
            }).start();
            return;
        }
        this.setState((prevState)=>({
            imageindex:prevState.imageindex+indexDirection
        }), ()=>{
            this.imageXPos.setValue(indexDirection*this.width)
            Animated.spring(this.imageXPos,{
                toValue:0,
            }).start();
        });
        
    }
    static propTypes ={
        initialDealData:PropTypes.object.isRequired,
        onBack:PropTypes.func.isRequired,
    };
    state={
        deal:this.props.initialDealData,
        imageindex:0,
    };
    async componentDidMount(){
        const fullDeal=await ajax.fetchDealDetail(this.state.deal.key)
        this.setState({
            deal:fullDeal,
        });
    }
    openDealUrl=()=>{
        Linking.openURL(this.state.deal.url)
    }
  render() {
    const {deal}=this.state;
    return (
        <ScrollView style={styles.deal}>
            <TouchableOpacity onPress={()=>{this.props.onBack}}>
               <Text style={styles.backlink}>Back</Text> 
            </TouchableOpacity>
            <Animated.Image
            {...this.imagePanResponder.panHandlers} 
            source={{uri:deal.media[this.state.imageindex] }} style={[{left:this.imageXPos}, styles.image]}/>
            <View style={styles.detail}>
                <View>
                    <Text style={styles.title}>{deal.title}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.info}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{deal.price}</Text>
                    </View>
            {deal.user && (
            <View>
                <Image source={{uri:deal.user.avatar}} style={styles.avatar}/>
                <Text>{deal.user.name}</Text>
            </View>)}
            </View>
            <View>
                <Text>{deal.description}</Text>
            </View>
            <Button title='Buy this deal!' onPress={this.openDealUrl}/>
        </View> 
    </ScrollView>  
    );
  }
}
 const styles=StyleSheet.create({
    deal:{
        marginHorizontal:12,
        marginTop:50,
        
    },
    image:{
        width:'100%',
        height:150,
        backgroundColor:'#ccc',
    },
    detail:{
        borderColor:'#bbb',
        borderWidth:1,
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
        padding:10,
        fontWeight:'bold',
        color:'black',
        backgroundColor:'gray',
    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    cause:{
        flex:2,
        color:'black'
    },
    price:{
        flex:1,
        textAlign:'right',
        color:'black'
    },
    avatar:{
        width:60,
        height:60
    },
    backlink:{
        marginBottom:5,
        color:'blue'
    }
 })