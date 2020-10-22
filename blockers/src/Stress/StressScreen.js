import React from 'react';
import Stress from './Style';

export default function SOne ({navigation}) {
    const title = "예기치 않은 일로 귀찮았는가요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressTwo" Title={title} />
        </>
    )
}

export function STwo ({navigation}) {
    const title = "생활의 중요한 일들을 통제하기가 힘든 것 같은가?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressThree" Title={title} />
        </>
    )
}

export function SThree ({navigation}) {
    const title = "신경이 곤두서거나 스트레스를 받는다고 느꼈는가?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressFour" Title={title} />
        </>
    )
}

export function SFour ({navigation}) {
    const title = "당신의 새오할에 일어난 중요한 변화에 효과적으로 대처했다고 느꼈나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressFive" Title={title} />
        </>
    )
}

export function SFive ({navigation}) {
    const title = "당신이 원하는 대로 일들이 진행되었나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressSix" Title={title} />
        </>
    )
}

export function SSix ({navigation}) {
    const title = "당신이 해야하는 모든일들을 책임질 수 없다고 생각하나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressSeven" Title={title} />
        </>
    )
}

export function SSeven ({navigation}) {
    const title = "당신의 신경질을 참을 수 있었나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressEight" Title={title} />
        </>
    )
}

export function SEight ({navigation}) {
    const title = "당신의 상황을 이끈다고 느꼈나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressNine" Title={title} />
        </>
    )
}

export function SNine ({navigation}) {
    const title = "당신의 처리능력을 넘어서는 일들 때문에 화가 난 적이 있었나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressTen" Title={title} />
        </>
    )
}

export function STen ({navigation}) {
    const title = "당신이 해결해야 하는 일들 때문에 놀란적이 있었나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressEleven" Title={title} />
        </>
    )
}

export function SEleven ({navigation}) {
    const title = "당신의 시간을 잘 조절해서 보낼 수 있었나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressTwelve" Title={title} />
        </>
    )
}

export function STwelve ({navigation}) {
    const title = "힘든 일이 많아서 제대로 조절할 수 없었나요?";
    return (
        <>
            <Stress navigation={navigation} Nextpage="Home" Title={title} />
        </>
    )
}