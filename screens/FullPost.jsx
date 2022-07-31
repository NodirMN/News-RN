import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import axios from "axios";
import { Loading } from "../components/Loading";

    const PostImage = styled.Image`
    border-radius:10px;
    width:100%;
    height:250px;
    margin-bottom:20px
`
    const PostText = styled.Text`
        font-size:18px;
        line-height:24px;
    `


export const FullPostScreen = ({route, navigation}) => {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState();
    const {id, title} = route.params;
        React.useEffect(()=>{
            navigation.setOptions({
                title,
            })
    axios
        .get("https://62e53585c6b56b451190dc9c.mockapi.io/data/" +id)
        .then(({ data }) => {
            setData(data);
        })
        .catch((err) => {
            console.log(err);
            Alert.alert("Ошибка", "Не удалось получить статьи");
        })
        .finally(() => {
            setLoading(false);
        });
        }, [])

        if (isLoading) {
        return (
            <View >
                <Loading/>
            </View>
        );
    }
    return (
        <View style={{padding: 20}}>
        <PostImage
            source={{uri:data.imageUrl}}
        />
        <PostText>
                {data.text}
        </PostText>
    </View>
  );
};