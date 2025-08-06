import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { TodoItem, Todo } from './TodoItem';

export const CompletedTasksScreen: React.FC = () => {
  const { user } = useAuth();
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    loadCompletedTodos();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadCompletedTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(`todos_${user?.id}`);
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        const completed = parsedTodos.filter((todo: Todo) => todo.completed);
        setCompletedTodos(completed);
      }
    } catch (error) {
      console.error('Error loading completed todos:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const storedTodos = await AsyncStorage.getItem(`todos_${user?.id}`);
      if (storedTodos) {
        const allTodos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        
        const updatedTodos = allTodos.map((todo: Todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        
        await AsyncStorage.setItem(`todos_${user?.id}`, JSON.stringify(updatedTodos));
        const completed = updatedTodos.filter((todo: Todo) => todo.completed);
        setCompletedTodos(completed);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    Alert.alert(
      'Delete Completed Task',
      'Are you sure you want to delete this completed task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const storedTodos = await AsyncStorage.getItem(`todos_${user?.id}`);
              if (storedTodos) {
                const allTodos = JSON.parse(storedTodos).map((todo: any) => ({
                  ...todo,
                  createdAt: new Date(todo.createdAt),
                }));
                
                const updatedTodos = allTodos.filter((todo: Todo) => todo.id !== id);
                await AsyncStorage.setItem(`todos_${user?.id}`, JSON.stringify(updatedTodos));
                
                const completed = updatedTodos.filter((todo: Todo) => todo.completed);
                setCompletedTodos(completed);
              }
            } catch (error) {
              console.error('Error deleting todo:', error);
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCompletedTodos();
    setRefreshing(false);
  };

  const sortedCompletedTodos = [...completedTodos].sort((a, b) => {
    // Sort by completion date (most recent first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getCompletionStats = () => {
    const today = new Date();
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const completedToday = completedTodos.filter(todo => {
      const completionDate = new Date(todo.createdAt);
      return completionDate.toDateString() === today.toDateString();
    }).length;

    const completedThisWeek = completedTodos.filter(todo => {
      const completionDate = new Date(todo.createdAt);
      return completionDate >= thisWeek;
    }).length;

    const completedThisMonth = completedTodos.filter(todo => {
      const completionDate = new Date(todo.createdAt);
      return completionDate >= thisMonth;
    }).length;

    return { completedToday, completedThisWeek, completedThisMonth };
  };

  const stats = getCompletionStats();

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Completed Tasks</Text>
          <Text style={styles.headerSubtitle}>Celebrate your achievements!</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completedToday}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completedThisWeek}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completedThisMonth}</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedTodos.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Completed Tasks List */}
        <FlatList
          data={sortedCompletedTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          )}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor="#3B82F6"
              colors={['#3B82F6']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>✓</Text>
              </View>
              <Text style={styles.emptyTitle}>No completed tasks yet!</Text>
              <Text style={styles.emptyText}>
                Complete some tasks to see them here
              </Text>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  todoList: {
    flex: 1,
  },
  todoListContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 32,
    color: '#9CA3AF',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
}); 