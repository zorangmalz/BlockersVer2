import React from 'react';
import { Create, List } from './Style';

export default function DiaryWrite({navigation}) {
    return (
        <>
            <Create navigation={navigation} />
        </>
    )
}

export function DiaryList({navigation}) {
    return (
        <>
            <List navigation={navigation} />
        </>
    )
}