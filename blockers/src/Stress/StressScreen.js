import React from 'react';
import Stress from './Style';

export default function SOne ({navigation}) {
    const title = "예기치 않은 일로 귀찮았는가요?";

    
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressTwo" Title={title} total={0}/>
        </>
    )
}

export function STwo ({navigation,route}) {
    const title = "생활의 중요한 일들을 통제하기가 힘든 것 같은가요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressThree" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SThree ({navigation,route}) {
    const title = "신경이 곤두서거나 스트레스를 받는다고 느꼈는가요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressFour" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SFour ({navigation,route}) {
    const title = "당신의 생활에 일어난 중요한 변화에 효과적으로 대처하지 못했다고 느꼈나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressFive" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SFive ({navigation,route}) {
    const title = "당신이 원하는 대로 일들이 진행되지 않았나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressSix" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SSix ({navigation,route}) {
    const title = "당신이 해야하는 모든 일들을 책임질 수 없다고 생각하나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressSeven" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SSeven ({navigation,route}) {
    const title = "당신의 신경질을 참을 수 없었나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressEight" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SEight ({navigation,route}) {
    const title = "당신이 상황에 이끌린다고 생각하셨나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressNine" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SNine ({navigation,route}) {
    const title = "당신의 처리능력을 넘어서는 일들 때문에 화가 난 적이 있었나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressTen" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function STen ({navigation,route}) {
    const title = "당신이 해결해야 하는 일들 때문에 놀란 적이 있었나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressEleven" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function SEleven ({navigation,route}) {
    const title = "당신의 시간을 잘 조절해서 보낼 수 있었나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressTwelve" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}

export function STwelve ({navigation,route}) {
    const title = "힘든 일이 많아서 제대로 조절할 수 없었나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressThirteen" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}
export function SThirteen ({navigation,route}) {
    const title = "당신이 원하던 대로 일들이 진행되었나요?";
    const result=route.params
    return (
        <>
            <Stress navigation={navigation} Nextpage="StressFinal" Title={title} total={Number(JSON.stringify(result.result))}  />
        </>
    )
}