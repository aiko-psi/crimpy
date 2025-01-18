FROM registry.fedoraproject.org/fedora-toolbox:41

ENV PATH="/opt/android-sdk/cmdline-tools/latest/bin:$PATH" 
ENV ANDROID_HOME=/opt/android-sdk

RUN sudo dnf install -y npm java-17-openjdk libxkbfile
RUN sudo mkdir -p /opt/android-sdk/cmdline-tools/
WORKDIR /opt/android-sdk/cmdline-tools/
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip 
RUN sudo unzip commandlinetools-linux-11076708_latest.zip
RUN sudo mv cmdline-tools latest
RUN rm commandlinetools-linux-11076708_latest.zip
RUN yes | sudo $(which sdkmanager) --install 'platforms;android-35' 'system-images;android-35;google_apis_playstore;x86_64' 'platform-tools'
# Note: The advmanager is created in home directory. So create an emulator manually and start it with no audio and host gpu
# RUN echo no | avdmanager create avd --name crimpyTestDevice -k 'system-images;android-35;google_apis_playstore;x86_64'
# RUN /opt/android-sdk/emulator/emulator @crimpyTestDevice -gpu host -noaudio

