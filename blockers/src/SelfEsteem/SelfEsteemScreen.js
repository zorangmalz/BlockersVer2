import React from 'react';
import SelfEsteem from './Style';

export default function Zero({navigation, route}) {
    const title = "어렵지만, 나는 항상 어려운 문제를 해결할 수 있다.";
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemOne" Title={title} total={0} name={docID} /> 
        </>
    )
}

export function One({navigation,route}) {
    const title = "누군가가 나를 반대할 지라도, 나는 내가 원하는 것을 얻기 위한 수단과 방법을 찾을 수 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemTwo" Title={title} total={Number(JSON.stringify(result.result))}/>
        </>
    )
}

export function Two({navigation,route}) {
    const title = "목표를 정하고 목표를 성취하는 것이 나에게는 쉬운 일이다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemThree" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Three({navigation,route}) {
    const title = "뜻밖의 사건들을 효율성 있게 다룰 수 있는 자신감이 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemFour" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Four({navigation,route}) {
    const title = "내가 가진 것들에 대해 감사하며, 예기치 않은 상황을 어떻게 조절해야 하는지 알고 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemFive" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Five({navigation,route}) {
    const title = "나는 내 노력으로 대부분의 문제를 해결할 수 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemSix" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Six({navigation,route}) {
    const title = "나는 내 자신의 능력을 믿기 때문에 어려움에 직면하더라도 놀라거나 당황하지 않는다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemSeven" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Seven({navigation,route}) {
    const title = "나는 문제에 부딪혔을 때, 여러 가지 해결 방법을 찾을 수 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemEight" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Eight({navigation,route}) {
    const title = "내가 곤란한 일에 처했을 때, 나는 해결점을 생각할 수 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemNine" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}

export function Nine({navigation,route}) {
    const title = "나는 내가 하고자 하는 일이 무엇이든지 간에 내 상황을 조정할 수 있다.";
    const result=route.params
    
    return (
        <>
            <SelfEsteem navigation={navigation} Nextpage="SelfEsteemFinal" Title={title} total={Number(JSON.stringify(result.result))} />
        </>
    )
}