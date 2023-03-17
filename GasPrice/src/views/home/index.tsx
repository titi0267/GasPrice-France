import React, {useState} from 'react'
import {Text, TextInput, View} from 'react-native'
import getData from '../../gouvData/fetchGouvData';

const PathInput = () => {
    const [text, setText] = useState('');
    let dataApi = getData()

    return (
        <View>
            <TextInput
                style={{ height:40 }}
                placeholder="Départ ?"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
                >
            </TextInput>
            <Text>
                {text}
            </Text>
        </View>
    );
}

export default PathInput ;