import * as React from 'react';
import { StyleSheet,TouchableOpacity, Image,Text, View, TextInput, Alert, ScrollView } from 'react-native';

export default class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        fName: '',
        lName:'',
        address: '',
        contact:'',
        email: '',
        username:'', 
        password: '',
        setVerify: false
      }
    }
    
    updateValue = (val, prop) => {
      if(prop=='fName'){
        this.setState({
          fName:val
        })
      }
      else if(prop=='lName'){
        this.setState({
          lName:val
        })
      }
      else if(prop=='address'){
        this.setState({
          address:val
        })
      }
      else if(prop=='contact'){
        this.setState({
          contact:val
        })
      }
      else if(prop=='email'){
        this.setState({
          email:val
        })
      }
      else if(prop=='username'){
        this.setState({
          username:val
        })
      }
      else if(prop=='password'){
        this.setState({
          password:val
        })
      }
      else if(prop=='confirmPassword'){
        this.setState({
          confirmPassword:val
        })
      }
    }

    signupUser = async() => {

      let signupDetails={}
      signupDetails.fName=this.state.fName,
      signupDetails.lName=this.state.lName,
      signupDetails.address=this.state.address,
      signupDetails.contact=this.state.contact,
      signupDetails.email=this.state.email,
      signupDetails.username=this.state.username,
      signupDetails.password=this.state.password
      

      try {
        if(this.state.fName == '' || this.state.lName == '' || this.state.contact == '' || this.state.address == '' || this.state.email == '' || this.state.username == '' || this.state.password == '' || this.state.confirmPassword == '') {
          Alert.alert(Alert,'Please fill all the fields!')
        } else {
          if (this.state.password !== this.state.confirmPassword) {
            Alert.alert(Alert,'Please enter the same password!')
          } else {
            fetch('http://localhost:3000/users',{
              method:'POST',
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({signupDetails})
              })
            .then((response)=> response.json())
            .then((res)=>{
              if(res.success === true){
                console.log('User registered successfully!')
                this.setState({
                  fName: '',
                  lName:'',
                  address: '',
                  contact:'',
                  email: '',
                  username:'', 
                  password: '',
                })
              this.props.navigation.navigate('OtpScreen')
              }else{
                  Alert.alert('Registration is unsuccessfull. Please try again');
              }
            })
          } 
        }  
      }catch (error) {
          error => this.setState({ errorMessage: error.message })
      }      
    }
  
    render() {   
      return (
        <ScrollView>
        <View style={styles.container}>  
             <View style={styles.logoContainer}>
                <Image
                  style = {styles.logo}
                  source={require('../../assets/xl.png')}
                  >
                </Image>
              </View> 
               
          <TextInput
            style={styles.input}
            placeholder="First Name"
            keyboardType="default"
            value={this.state.fName}
            onChangeText={(val) => this.updateValue(val,'fName')} 
          />    
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            keyboardType="default"
            value={this.state.lName}
            onChangeText={(value) => this.updateValue(value, 'lName')}
          />  
          <TextInput
            style={styles.input}
            placeholder="Address"
            keyboardType="default"
            value={this.state.address}
            onChangeText={(value) => this.updateValue(value, 'address')}
          />  
          <TextInput
            style={styles.input}
            placeholder="Contact"
            keyboardType="phone-pad"
            underlineColorAndroid='transparent'
            value={this.state.contact}
            onChangeText={(value) => this.updateValue(value, 'contact')}
          />    
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={(value) => this.updateValue(value, 'email')}
          />

          <TextInput
            style={styles.input}
            placeholder="UserName"
            keyboardType="default"
            value={this.state.username}
            onChangeText={(value) => this.updateValue(value, 'username')}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(value) => this.updateValue(value, 'password')}
            maxLength={50}
            secureTextEntry={true}
          /> 

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={(value) => this.updateValue(value, 'confirmPassword')}
            maxLength={50}
            secureTextEntry={true}
          />    
          
          <TouchableOpacity style={[styles.buttonContainer,styles.signupButton]} 
            onPress={() => this.signupUser()}>
            <Text style={styles.signupText}>SIGNUP</Text>
          </TouchableOpacity>
  
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Already Registered? Click here to Login
          </Text>
                                   
        </View>
        </ScrollView>
      );
    }
  }

 
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
    },
    logo:{
      width:200,
      height:200,
      margin:15,
      justifyContent: 'center',
     
    },
    logoContainer:{
      alignItems: 'center',
      flexGrow:1,
      justifyContent:'center',
     
    },
  
    input: {
      width: '100%',
      marginLeft:5,
      marginRight:5,
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    loginText: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center'
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin:20,
      width:300,
      borderRadius:30,
      backgroundColor:'transparent'
    },
    signupButton: {
      backgroundColor: "#ac00e6",
      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
      elevation: 5,
    },
    signupText: {
      color: 'white',
      fontWeight:'bold',
    },
    loginText: {
      color: '#ac00e6',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal:20,
      fontSize:17
    },
  });