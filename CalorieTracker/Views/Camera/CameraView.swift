import SwiftUI

struct CameraView: View {
    @State private var viewModel = CameraViewModel()

    private var isCameraAvailable: Bool {
        UIImagePickerController.isSourceTypeAvailable(.camera)
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Spacer()

                // Preview area
                if let image = viewModel.capturedImage {
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFit()
                        .frame(maxHeight: 300)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .shadow(radius: 5)
                        .padding()
                } else {
                    VStack(spacing: 16) {
                        Image(systemName: "camera.viewfinder")
                            .font(.system(size: 80))
                            .foregroundStyle(AppColors.accent.opacity(0.6))

                        Text("Take a photo of your food")
                            .font(.title3)
                            .fontWeight(.medium)

                        Text("We'll estimate the calories for you")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                    .padding()
                }

                Spacer()

                // Action buttons
                VStack(spacing: 12) {
                    if viewModel.capturedImage != nil {
                        Button {
                            viewModel.analyzeImage()
                        } label: {
                            Label("Analyze Food", systemImage: "sparkles")
                                .font(.headline)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(AppColors.accent)
                                .foregroundStyle(.white)
                                .clipShape(RoundedRectangle(cornerRadius: 14))
                        }

                        Button("Retake Photo") {
                            viewModel.reset()
                        }
                        .foregroundStyle(.secondary)
                    } else {
                        if isCameraAvailable {
                            Button {
                                viewModel.showingCamera = true
                            } label: {
                                Label("Take Photo", systemImage: "camera.fill")
                                    .font(.headline)
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(AppColors.accent)
                                    .foregroundStyle(.white)
                                    .clipShape(RoundedRectangle(cornerRadius: 14))
                            }
                        }

                        Button {
                            viewModel.showingImagePicker = true
                        } label: {
                            Label("Choose from Library", systemImage: "photo.on.rectangle")
                                .font(.headline)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.gray.opacity(0.15))
                                .foregroundStyle(.primary)
                                .clipShape(RoundedRectangle(cornerRadius: 14))
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 20)
            }
            .navigationTitle("Scan Food")
            .sheet(isPresented: $viewModel.showingCamera) {
                ImagePicker(sourceType: .camera, selectedImage: $viewModel.capturedImage)
                    .ignoresSafeArea()
            }
            .sheet(isPresented: $viewModel.showingImagePicker) {
                ImagePicker(sourceType: .photoLibrary, selectedImage: $viewModel.capturedImage)
                    .ignoresSafeArea()
            }
            .sheet(isPresented: $viewModel.showingResults) {
                FoodResultView(viewModel: viewModel)
            }
        }
    }
}
