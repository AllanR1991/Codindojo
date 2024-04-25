import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import api from './service/Service';
import { Audio } from 'expo-av';


export default function App() {

  const Data =[id=1, title='']

  const [mensagem, setMensagem] = useState('');

  const [sound, setSound] = useState();

  async function playSound(response) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( {uri:'http://192.168.19.82:4056/audios/20240418_102554.wav'});
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function texttoSpeech(){
    //console.log(mensagem)
    try{
      const response = await api.post('/TextToSpeech',{
        texto: "Ola mundo"
      })
      
      await playSound(response)

      console.log(response);
    }
    catch(error){
      console.log(error);
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'flex-start', width: "100%", flexDirection: "row", alignItems: "center", gap: 19, padding: 24, backgroundColor: "#AF1367", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        <Image style={{ width: 50, height: 50 }} source={require("./assets/a.png")} />
        <Text style={{ color: "#FAFF00", fontSize: 24 }} > Jaspion</Text>
      </View>


      <View style={{height:"75%"}}>
          <View style={{width:"90%", height:200, backgroundColor:"#AF1367"}}>
            <Text>Oi</Text>
          </View>
      </View>










      <View style={{ width: "90%", flexDirection: 'row', gap: 16 }}>

        <View style={{ backgroundColor: "#b01b74", width: "85%", height: 49, borderRadius: 15, padding: 10, flexDirection: 'row' }} >
          <TextInput 
            placeholderTextColor={"white"} 
            placeholder='Escreva a mensagem'
            value={mensagem}
            onChangeText={(txt) => {
              setMensagem(txt)
            }}
            style={{ width: "90%", color: "white" }} />
          <TouchableOpacity
            onPress={()=>{
              texttoSpeech()
            }}
          >
            <AntDesign name="caretright" size={24} color="white" />
          </TouchableOpacity>

        </View>

        

        <TouchableOpacity>

          <View style={{ width: 49, height: 49, borderRadius: 50, backgroundColor: "#b01b74", alignItems: 'center', justifyContent: 'center' }} >
            <FontAwesome name="microphone" size={24} color="white" />
          </View>

          {/* <FontAwesome name="stop" size={24} color="white" /> */}

        </TouchableOpacity>


      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
