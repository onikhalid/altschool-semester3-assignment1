import { inject, type InjectionKey } from 'vue'

// Define an InjectionKey for the data context
export const DataContextKey: InjectionKey<any> = Symbol('DataContext')

// Create a composable function to access the data context
export const useUserData = () => {
  const dataContext = inject(DataContextKey)
  if (!dataContext) {
    throw new Error('useUserData must be used inside a component that provides the DataContext')
  }
  return dataContext
}