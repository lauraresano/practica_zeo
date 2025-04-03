package com.practica.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.practica.backend.model.AltaUsuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AltaUsuarioService {

    private boolean almacenamientoPersistente = true; // Cambiar a 'false' para usar almacenamiento en memoria

    
    private List<AltaUsuario> usuarios = new ArrayList<>(); // Declarar lista Usuarios  
    private final String FILE_PATH = "usuarios.json"; // Ruta para almacenamiento persistente

    private ObjectMapper objectMapper;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 

    public AltaUsuarioService() {
        this.objectMapper = new ObjectMapper();
    }

    // Registrar un usuario
    public String registrarUsuario(AltaUsuario usuario) {
        
        String hashedPassword = passwordEncoder.encode(usuario.getPassword()); // Encriptar contraseña
        usuario.setPassword(hashedPassword); 

        if (almacenamientoPersistente) {
            // Guardar usuarios en archivo JSON
            try {
                List<AltaUsuario> usuarios = obtenerUsuarios();  // Obtén los usuarios actuales del archivo
                usuarios.add(usuario);  // Añadir el nuevo usuario
                objectMapper.writeValue(new File(FILE_PATH), usuarios);  // Guardar en el archivo
                return "OK";

            } catch (IOException e) {
                e.printStackTrace();
                return "Error al guardar el usuario";
            }
        } else {
            usuarios.add(usuario); // Guardar usuario en memoria
            return "OK";
        }
    }

    // Obtener todos los usuarios registrados
    public List<AltaUsuario> obtenerUsuarios() {
        // Lista de archivo JSON
        if (almacenamientoPersistente) {
            try {
                File file = new File(FILE_PATH);
                if (file.exists()) {
                    return objectMapper.readValue(file, new TypeReference<List<AltaUsuario>>() {});
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return usuarios;  // Si no, devolver la lista en memoria
    }

    // Autenticar un usuario
    public String autenticarUsuario(AltaUsuario usuario) {
        List<AltaUsuario> usuarios = obtenerUsuarios();
        // Recorrer lista y comparar con usuario recibido
        for (AltaUsuario u : usuarios) {
            if (u.getEmail().equals(usuario.getEmail())) {
                // Verificar que las contraseñas encriptadas coincidan
                if (passwordEncoder.matches(usuario.getPassword(), u.getPassword())) {
                    return "OK"; 
                }
            }
        }
        return "Credenciales incorrectas"; // Si no se encuentra una coincidencia
    }
}
