import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { Todo } from './TodoItem';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [slideAnim] = useState(new Animated.Value(300));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [visible]);

  const handleAdd = () => {
    if (text.trim().length === 0) {
      Alert.alert('Error', 'Please enter a todo text');
      return;
    }

    onAdd({
      text: text.trim(),
      completed: false,
      priority,
    });

    // Reset form
    setText('');
    setPriority('medium');
    onClose();
  };

  const handleCancel = () => {
    setText('');
    setPriority('medium');
    onClose();
  };

  const PriorityButton: React.FC<{
    value: Todo['priority'];
    label: string;
    color: string;
  }> = ({ value, label, color }) => (
    <TouchableOpacity
      style={styles.priorityButton}
      onPress={() => setPriority(value)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.priorityButtonContent,
          { 
            backgroundColor: priority === value ? color : '#F3F4F6',
            borderColor: priority === value ? color : '#E5E7EB',
          },
        ]}
      >
        <Text
          style={[
            styles.priorityButtonText,
            { color: priority === value ? 'white' : '#374151' },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Add New Todo</Text>
              <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              {/* Todo Text Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>What needs to be done?</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter your todo..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    maxLength={200}
                    autoFocus
                  />
                </View>
              </View>

              {/* Priority Selection */}
              <View style={styles.priorityContainer}>
                <Text style={styles.label}>Priority Level</Text>
                <View style={styles.priorityButtons}>
                  <PriorityButton
                    value="low"
                    label="Low"
                    color="#3B82F6"
                  />
                  <PriorityButton
                    value="medium"
                    label="Medium"
                    color="#F59E0B"
                  />
                  <PriorityButton
                    value="high"
                    label="High"
                    color="#EF4444"
                  />
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdd}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>Add Todo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 24,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
  },
  priorityButtonContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  addButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 