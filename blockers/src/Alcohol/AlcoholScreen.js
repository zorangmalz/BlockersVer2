import React from 'react';
import Alcohol, { AlcoholThree } from './Style';

export default function AOne({ navigation }) {
    
    const title = "술을 얼마나 자주 마십니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholThree" Title={title} total={0} Kind={true} />
        </>
    )
}


export function AThree ({navigation,route}) {
    
    const result=route.params
    const title = "한번 술을 마실 때 소주 1병 또는 맥주 4병 이상 마시는 음주는 얼마나 자주 하십니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholFour" Title={title} total={Number(JSON.stringify(result.result))} Kind={true} />
        </>
    )
}

export function AFour ({navigation,route}) {
    const result=route.params
    const title = "지난 1년간, 술을 한 번 마시기 시작하면 멈출 수 없었던 때가 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholFive" Title={title} total={Number(JSON.stringify(result.result))} Kind={false} />
        </>
    )
}

export function AFive ({navigation,route}) {
    const result=route.params
    const title = "지난 1년간, 당신은 평소 할 수 있었던 일을 음주 때문에 실패한 적이 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholSix" Title={title} total={Number(JSON.stringify(result.result))} Kind={false} />
        </>
    )
}

export function ASix ({navigation,route}) {
    const result=route.params
    const title = "지난 1년간, 음주 후의 죄책감이 들거나 후회를 한 적이 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholSeven" Title={title} total={Number(JSON.stringify(result.result))} Kind={false} />
        </>
    )
}

export function ASeven ({navigation,route}) {
    const result=route.params
    const title = "지난 1년간, 음주 때문에 전날 밤에 있었던 일이 기억나지 않았던 적이 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholEight" Title={title} total={Number(JSON.stringify(result.result))} Kind={false} />
        </>
    )
}

export function AEight ({navigation,route}) {
    const result=route.params
    const title = "음주로 인해 자신이나 다른 사람이 다친 적이 있었습니까?";
    return (
        <>
            <AlcoholThree navigation={navigation} Nextpage="AlcoholNine" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function ANine ({navigation,route}) {
    const result=route.params
    const title = "친척이나 친구, 또는 의사가 당신이 술 마시는 것을 걱정하거나 술 끊기를 권유한 적이 있었습니까?";
    return (
        <>
            <AlcoholThree navigation={navigation} Nextpage="AlcoholFinal" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}