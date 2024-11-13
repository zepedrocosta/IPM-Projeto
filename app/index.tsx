import { Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import Register from './(tabs)/register';

export default function HomePage() {
  const router = useRouter();

  const navigateToRegister = () => {
    router.push('/');
  };

  return (
    Register()
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
