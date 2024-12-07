/**
 * Custom hook for managing form state
 * Provides a simplified interface for handling form field updates
 */
import { useState, useCallback } from 'react';

/**
 * @template T
 * @param {T} initialState - Initial form state
 * @returns {[T, (field: keyof T, value: any) => void]} Tuple containing form state and update function
 */
export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  /**
   * Updates a single field in the form state
   * @param {keyof T} field - Form field name
   * @param {any} value - New value for the field
   */
  const setFieldValue = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return [formData, setFieldValue];
};