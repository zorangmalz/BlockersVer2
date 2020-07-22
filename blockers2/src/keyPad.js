import React from 'react';

export default function KeyPad() {
    return(
        <View style={password.largeBox}>
                    <View style={password.mediumBox}>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddOne}>
                            <Text style={password.number}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddTwo}>
                            <Text style={password.number}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddThree}>
                            <Text style={password.number}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={password.mediumBox}>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddFour}>
                            <Text style={password.number}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddFive}>
                            <Text style={password.number}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddSix}>
                            <Text style={password.number}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={password.mediumBox}>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddSeven}>
                            <Text style={password.number}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddEight}>
                            <Text style={password.number}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddNine}>
                            <Text style={password.number}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={password.mediumBox}>
                        <TouchableOpacity style={password.smallBox} onPress={onDelete} onPressIn={onDeleteAll}>
                            <Text style={password.text}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddZero}>
                            <Text style={password.number}>0</Text >
                        </TouchableOpacity>
                        <TouchableOpacity style={password.smallBox} onPress={onDecrease} onPressIn={onDeleteOne}>
                            <Text style={password.text}>지우기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {count===4 ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff' }}>완료</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>완료</Text>
                    </View>
                }
    )
}