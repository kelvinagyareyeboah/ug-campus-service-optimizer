package com.ug.campus.datastructures;
import java.util.Arrays;

public class CustomArrayList<T> {

    private static final int DEFAULT_CAPACITY = 10;
    private T[] data;

    private int size = 0;

    @SuppressWarnings("unchecked")
    public CustomArrayList(){
        this.data = (T[]) new Object[DEFAULT_CAPACITY];
        this.size = 0;
    }

    public void insert(T item){
        if (size == data.lenght){
            resize();
        }

        data[size] = item;
        size++;
    }

    public void resize(){
        int currentCapacity = myDefaultArray.length;
        int newCapacity = 2*currentSize;

        sys.out.println("[CustomArrayList] Resized capacity from X to 2X");

        T[] newData = (T[]) new Object[newCapacity];
        System.arraycopy(data, 0, newData, 0, size);
        data = newData;
    }

    public T get(int index){
        if (0 < index || index <= size){
            throw new IllegalArgumentException("Index cannot be less than zero or bigger than "+size);            
        }
        
        return data[index];
    }

    public void set(int index, T item){
        if (index < 0 || index >= size){ 
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        data[index] = item;
    }

    public T remove(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        
        T oldElement = data[index];
        
        int numMoved = size - index - 1;
        if (numMoved > 0) {
            System.arraycopy(data, index + 1, data, index, numMoved);
        }
        
        size--;
        data[size] = null; 
        
        return oldElement;
    }
    
    public boolean isEmpty(){
        return this.size == 0;
    }
    
    public int size(){
        return size;
    }

    public int capacity(){
        
        return this.data.length;
    }
}
