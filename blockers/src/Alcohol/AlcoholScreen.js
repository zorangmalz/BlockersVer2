import React from 'react';
import Alcohol, { AlcoholThree } from './Style';

export default function AOne({ navigation }) {
    const title = "술을 얼마나 자주 마십니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholTwo" Title={title} Kind={true} />
        </>
    )
}

export function ATwo ({navigation}) {
    const title = "평소에 술을 마시는 날 몇잔 정도나 마십니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholThree" Title={title} Kind={true} />
        </>
    )
}

export function AThree ({navigation}) {
    const title = "한번 술을 마실 떄 소주 1병 또는 맥주 4병 이상 마시는 음주는 얼마나 자주 하십니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholFour" Title={title} Kind={true} />
        </>
    )
}

export function AFour ({navigation}) {
    const title = "지난 1년간, 술을 한 번 마시기 시작하면 멈출 수 없었던 때가 얼마나 자주있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholFive" Title={title} Kind={false} />
        </>
    )
}

export function AFive ({navigation}) {
    const title = "지난 1년간, 당신은 평소 할 수 있었던 일을 음주때문에 실패한 적이 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholSix" Title={title} Kind={false} />
        </>
    )
}

export function ASix ({navigation}) {
    const title = "지난 1년간, 음주 후의 죄책감이 들거나 후회를 한 적이 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholSeven" Title={title} Kind={false} />
        </>
    )
}

export function ASeven ({navigation}) {
    const title = "지난 1년간, 음주 때문에 전날 밤에 있었던 일이 기억나지 않았던 적이 얼마나 자주 있었습니까?";
    return (
        <>
            <Alcohol navigation={navigation} Nextpage="AlcoholEight" Title={title} Kind={false} />
        </>
    )
}

export function AEight ({navigation}) {
    const title = "음주로 인해 자신이나 다른사람이 다친적이 있었습니까?";
    return (
        <>
            <AlcoholThree navigation={navigation} Nextpage="AlcoholNine" Title={title} />
        </>
    )
}

export function ANine ({navigation}) {
    const title = "친척이나 친구, 또는 의사가 당신이 술 마시는 것을 걱정하거나 술끊기를 권유한 적이 있었습니까?";
    return (
        <>
            <AlcoholThree navigation={navigation} Nextpage="Home" Title={title} />
        </>
    )
}