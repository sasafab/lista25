import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal, Image, ImageBackground } from 'react-native';
//import { Filter, ImageFilter } from 'react-native-image-filter-kit';

// Importando as imagens
import image1 from './Assets/005db31be3b9a96536bd06181ca4cd4c.jpg';
import image2 from './Assets/30e09de63dac849ae31bdfd6e320b07e.jpg';
import image3 from './Assets/9cd54da40d830843782e61d9059c4ee0.jpg';
import image4 from './Assets/0e56d1b0161811d8c64fec2f711701f8.jpg';
import image5 from './Assets/748e6f7fe39996a47226ed10ca119514.jpg';
import image6 from './Assets/796f4f7331327b1a381bd826d59a95c8.jpg';
import image7 from './Assets/06ead85338fe39d60bd3c5087695510e.jpg';
import image8 from './Assets/b416aa0b0167bb714756e256be89ee78.jpg';
import image9 from './Assets/b56670416fb15250f6d4f14db24acc11.jpg';
import image10 from './Assets/c2bd7569757dead6c29012586deafbfa.jpg';
import image11 from './Assets/27bec94dcb83c276328cbcb2d10e0709.jpg';
import image12 from './Assets/e4d25079a90a78c3ba1999cb969cf471.jpg';
import image13 from './Assets/e51eb90194662a9e5b9c024021d36484.jpg';
import image14 from './Assets/ef1ce4eca806d62a90459c77ed8ac8ef.jpg';
import image15 from './Assets/f0a7ac59ce10e9e852f75f5b83c9f127.jpg';
import image16 from './Assets/30dfc76823f82a4580f2eb9a513b94fa.jpg';
import image17 from './Assets/eaa11c58e338f1170f1e0f8fc0d71e0d.jpg';
import image18 from './Assets/32078b7d8306c66c907358e426ac2b4f.jpg';
import image19 from './Assets/f0495e78e6fa6a4dba34d41c5ab69457.jpg';
import image20 from './Assets/3a868ff5e1171429d7fb616a47a03b9e.jpg';
import image21 from './Assets/3b9a76c5e3f01ef3af794d8233e34107.jpg';
import image22 from './Assets/42f9faacc60cf0dbbb9f30acd6419eb7.jpg';
import image23 from './Assets/47f6aff68ca0c7847b03426d9f1f8f0e.jpg';
import image24 from './Assets/5592f921034d405dcc2726654c0f4168.jpg';
import image25 from './Assets/f373514ecab5e4c5470cbe7cc22e5e5f.jpg';
import image26 from './Assets/f94b052fd279f49a32cf6e88a121e0fd.jpg';
import image27 from './Assets/61778755bf026319451e4357b450c54e.jpg';
import image28 from './assets2/02de6848cd6cc91c65161bb6847aa38d.jpg';
import image29 from './assets2/0aead59a90e62f27c80528d1b59fe68d.jpg';
import image30 from './assets2/1778a0b6d290d1473968241cf184d8c5.jpg';
import image31 from './assets2/1eaa969965383f4f389aff28bf1db461.jpg';
import image32 from './assets2/3e66bf67d8eb223079eb3f9e2e66d4cc.jpg';
import image33 from './assets2/4d422261cb1ac3f52eea4c6d3ea9d0d6.jpg';
import image34 from './assets2/63052a75aa49a822092a4e5520a9af65.jpg';
import image35 from './assets2/662417bc5eed392f70469ca410b2be53.jpg';
import image36 from './assets2/6a1b55d39c1236a3f207f7b81142e710.jpg';
import image37 from './assets2/6c6f46df69f16fcf68bf3afb4e2081a6.jpg';
import image38 from './assets2/6d64c3de69ebd641c055615aeeddc4fd.jpg';
import image39 from './assets2/73c4773646239614467af3b79f786bc4.jpg';
import image40 from './assets2/749647f9b500b66b8bc4b330182c8695.jpg';

import lixo from './Assets/lixo.png';
import galeria from './Assets/gsleria.png';


// Função para gerar IDs únicos
const generateUniqueId = () => Date.now() + Math.random().toString(36).substr(2, 9);

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [titles, setTitles] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [tasks, setTasks] = useState({});
  const [currentTaskForTitle, setCurrentTaskForTitle] = useState({});
  const [checkedTasks, setCheckedTasks] = useState({});
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [selectedImages, setSelectedImages] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTitleText, setEditingTitleText] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isDarkMode ? 28 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleAddTitle = () => {
  if (currentTitle.trim()) {
    const id = generateUniqueId();
    setTitles([{ id, title: currentTitle.trim() }, ...titles]);
    setTasks(prevTasks => ({ ...prevTasks, [id]: [] }));
    setCheckedTasks(prevChecked => ({ ...prevChecked, [id]: [] }));
    setCurrentTaskForTitle(prev => ({ ...prev, [id]: '' }));
    setCurrentTitle('');
  }
};

const handleAddTask = (id) => {
  const task = currentTaskForTitle[id];
  if (task.trim()) {
    setTasks(prevTasks => ({ ...prevTasks, [id]: [task.trim(), ...(prevTasks[id] || [])] }));
    setCheckedTasks(prevChecked => ({ ...prevChecked, [id]: [false, ...(prevChecked[id] || [])] }));
    setSelectedImages(prevImages => ({ ...prevImages, [id]: [null, ...(prevImages[id] || [])] }));
    setCurrentTaskForTitle(prev => ({ ...prev, [id]: '' }));
  }
};


  const handleToggleCheck = (id, index) => {
    const updatedChecked = checkedTasks[id].slice();
    updatedChecked[index] = !updatedChecked[index];
    setCheckedTasks({ ...checkedTasks, [id]: updatedChecked });
  };

  const handleTaskChange = (id, index, text) => {
    const updatedTasks = tasks[id].slice();
    updatedTasks[index] = text;
    setTasks({ ...tasks, [id]: updatedTasks });
  };

  const handleTaskInputChange = (id, text) => {
    setCurrentTaskForTitle(prev => ({ ...prev, [id]: text }));
  };

  const handleDeleteTask = (id, index) => {
    const updatedTasks = tasks[id].slice();
    updatedTasks.splice(index, 1);
    setTasks({ ...tasks, [id]: updatedTasks });

    const updatedCheckedTasks = checkedTasks[id].slice();
    updatedCheckedTasks.splice(index, 1);
    setCheckedTasks({ ...checkedTasks, [id]: updatedCheckedTasks });

    const updatedSelectedImages = selectedImages[id].slice();
    updatedSelectedImages.splice(index, 1);
    setSelectedImages({ ...selectedImages, [id]: updatedSelectedImages });
  };

  const startEditingTitle = (id, currentTitle) => {
    setEditingTitleId(id);
    setEditingTitleText(currentTitle);
  };

  const handleTitleBlur = () => {
    if (editingTitleText.trim() === '') {
      setTitles(titles.filter(title => title.id !== editingTitleId));
      const updatedTasks = { ...tasks };
      delete updatedTasks[editingTitleId];
      setTasks(updatedTasks);

      const updatedCheckedTasks = { ...checkedTasks };
      delete updatedCheckedTasks[editingTitleId];
      setCheckedTasks(updatedCheckedTasks);

      setCurrentTaskForTitle(prev => {
        const { [editingTitleId]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setTitles(titles.map(title =>
        title.id === editingTitleId ? { ...title, title: editingTitleText.trim() } : title
      ));
    }
    setEditingTitleId(null);
    setEditingTitleText('');
  };

  const handleSelectImage = (id, index) => {
    setSelectedTaskId({ sectionId: id, taskIndex: index });
    setModalVisible(true);
  };

  const handleImageSelect = (imageUri) => {
    const { sectionId, taskIndex } = selectedTaskId;
    const updatedImages = selectedImages[sectionId].slice();
    updatedImages[taskIndex] = imageUri;
    setSelectedImages({ ...selectedImages, [sectionId]: updatedImages });
    setModalVisible(false);
  };

  const images = [
    { uri: image1 },
    { uri: image2 },
    { uri: image3 },
    { uri: image4 },
    { uri: image5 },
    { uri: image6 },
    { uri: image7 },
    { uri: image8 },
    { uri: image9 },
    { uri: image10 },
    { uri: image11 },
    { uri: image12 },
    { uri: image13 },
    { uri: image14 },
    { uri: image15 },
    { uri: image16 },
    { uri: image17 },
    { uri: image18 },
    { uri: image19 },
    { uri: image20 },
    { uri: image21 },
    { uri: image22 },
    { uri: image23 },
    { uri: image24 },
    { uri: image25 },
    { uri: image26 },
    { uri: image27 },
    { uri: image28 },
    { uri: image29 },
    { uri: image30 },
    { uri: image31 },
    { uri: image32 },
    { uri: image33 },
    { uri: image34 },
    { uri: image35},
    { uri: image36 },
    { uri: image37},
    { uri: image38},
    { uri: image39 },
    { uri: image40},
  ];

  return (
    <Animated.View style={[styles.container, { backgroundColor: translateX.interpolate({
      inputRange: [0, 28],
      outputRange: ['#faf9f8', '#2a2a2a'],
    })}, styles.safe]}>
      <ScrollView style={styles.scrollView}>
      <TouchableOpacity style={[styles.toggleContainer, isDarkMode && styles.toggleContainerDark]} onPress={toggleTheme}>
            <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
          </TouchableOpacity>
        <View style={[styles.container, styles.TitleandToggle]}>
          

          <TextInput
            style={[styles.titleInput, { color: isDarkMode ? '#faf9f8' : '#000', borderColor: isDarkMode ? '#444' : '#ddd' }]}
            placeholder="Adicione uma seção para suas tarefas"
            placeholderTextColor={isDarkMode ? 'white' : '#999'}
            value={currentTitle}
            onChangeText={setCurrentTitle}
            onSubmitEditing={handleAddTitle}
          />
        </View>

        {titles.map(({ id, title }) => (
          <View key={id} style={styles.titleContainer}>
            {editingTitleId === id ? (
              <TextInput
                style={[styles.editTitleInput, { color: isDarkMode ? '#faf9f8' : '#000', borderColor: isDarkMode ? '#444' : '#ddd' }]}
                value={editingTitleText}
                onChangeText={setEditingTitleText}
                onBlur={handleTitleBlur}
                autoFocus
              />
            ) : (
              <TouchableOpacity onLongPress={() => startEditingTitle(id, title)}>
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, {color: isDarkMode ? '#faf9f8' : '#000'}]}>{title}</Text>
                </View>
              </TouchableOpacity>
            )}

            {tasks[id] && tasks[id].map((task, i) => (
              <View key={i} style={styles.taskContainer}>
                <ImageBackground
  source={selectedImages[id]?.[i] || null}
  style={[styles.taskBox, { backgroundColor: isDarkMode ? '#4F4D4D' : '#eee' }]}
  imageStyle={{ borderRadius: 20 }}
>

                  <View style={styles.DelandImage}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteTask(id, i)}
                    >
                      <Image style={styles.deleteButtonText} source={lixo}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.selectImageButton}
                      onPress={() => handleSelectImage(id, i)}
                    >
                      <Image style={styles.selectImageButtonText} source={galeria}></Image>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.InputTextandCheck}>
                    <TextInput
                      style={[styles.taskInput, { color: isDarkMode ? '#000' : '#000', borderColor: isDarkMode ? '#444' : '#ddd' }]}
                      placeholder={`Adicione uma tarefa para ${title}`}
                      placeholderTextColor={isDarkMode ? 'pink' : 'red'}
                      value={task}
                      onChangeText={text => handleTaskChange(id, i, text)}
                    />
                    <TouchableOpacity 
                      style={[styles.checkButton, { backgroundColor: checkedTasks[id]?.[i] ? '#C6E5B1' : '#fff'}]}
                      onPress={() => handleToggleCheck(id, i)}
                    />
                  </View>
                </ImageBackground>
              </View>
            ))}

            <TextInput
              style={[styles.taskInput, { color: isDarkMode ? '#faf9f8' : 'black', borderColor: isDarkMode ? '#444' : '#ddd' }]}
              placeholder={`Adicione uma tarefa para ${title}`}
              placeholderTextColor={isDarkMode ? 'black' : '#999'}
              value={currentTaskForTitle[id] || ''}
              onChangeText={text => handleTaskInputChange(id, text)}
              onSubmitEditing={() => handleAddTask(id)}
            />
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {images.map((img, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => handleImageSelect(img.uri)}
                style={styles.imageTouchable}
              >
                <Image 
                  source={img.uri} 
                  style={styles.modalImage} 
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe:{
    marginTop:32,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',                                     
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    maxHeight: '70%',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageTouchable: {
    marginBottom: 10,
    maxHeight: 200,
    alignItems: 'center',
  },
  modalImage: {
    paddingVertical: 15,
    width: '80%',
    height: 150,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    maxWidth: '50%',
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignSelf: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TitleandToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 50,
    maxHeight: 70,
  },
  InputTextandCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow:1,    
    gap: 15,
    marginTop: 10,
  },
  DelandImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  scrollView: {
    padding: 20,
  },
  toggleContainer: {
    height: 30,
    width: 60,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  toggleContainerDark: {
    backgroundColor: '#444',
  },
  circle: {
    height: 26,
    width: 26,
    marginRight: 28,
    borderRadius: 12,
    backgroundColor: '#fff',
    transform: [{ translateX: 0 }],
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    height: 45,
    marginBottom: 20,
    marginTop: 12,
  },
  titleContainer: {
    marginBottom: 20,
    marginTop: 15,
    
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    paddingLeft: 6,
    fontWeight: 'bold',
  },
  editTitleInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  taskContainer: {
    marginBottom: 10,
   // padding: 8,
  },
  taskBox: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 0,
    gap: 30,
    borderColor: '#ddd',
    backgroundColor: '#eee',
    height: 180,
  },
  taskInput: {
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: 'rgba(250, 249, 248, 0.7)',
    padding: 10,
    flex: 1,
    marginBottom: 10,
  },
  checkButton: {
    width: 27,
    height: 27,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    marginBottom: 10,
  },
  deleteButton: {
    marginBottom: 10,
  },
  deleteButtonText: {
    objectFit: 'cover',
    height: 20,
    width: 20,
  },
  selectImageButton: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  selectImageButtonText: {
    height: 25,
    width: 25,
    objectFit: 'cover',
  },
});

export default ThemeToggle;
